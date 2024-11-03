"use client";

import { Attachment, ChatRequestOptions, CreateMessage, Message } from "ai";
import cx from "classnames";
import { motion } from "framer-motion";
import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from "react";
import { toast } from "sonner";
import { useLocalStorage, useWindowSize } from "usehooks-ts";

import { ArrowUpIcon, PaperclipIcon, StopIcon } from "./icons";
import { Button } from "./button";
import { Textarea } from "./textarea";
import { sanitizeUIMessages } from "../lib/utils";
import { ClientMessage } from "../actions";

const suggestedActions = [
  {
    title: "Find a gift",
    label: "for a birthday",
    action: "I'm looking for a birthday gift. Can you help me choose?",
  },
  {
    title: "Suggest a unique gift",
    label: "for someone who loves books",
    action: "Can you suggest a unique gift for someone who loves books?",
  },
  {
    title: "Recommend a personalized gift",
    label: "for a special occasion",
    action:
      "I want to find a personalized gift for a special occasion. What would you recommend?",
  },
  {
    title: "Include a special message",
    label: "with the gift",
    action: "Can you help me include a special message with the gift?",
  },
];

export function MultimodalInput({
  input,
  setInput,
  isLoading,
  stop,
  // attachments,
  // setAttachments,
  messages,
  setMessages,
  append,
  handleSubmit,
  className,
}: {
  input: string;
  setInput: (value: string) => void;
  isLoading: boolean;
  stop: () => void;
  // attachments: Array<Attachment>;
  // setAttachments: Dispatch<SetStateAction<Array<Attachment>>>;
  messages: Array<ClientMessage>;
  setMessages: Dispatch<SetStateAction<Array<ClientMessage>>>;
  append: (value: string) => Promise<void>;
  // handleInputChange: (
  //   event:
  //     | React.ChangeEvent<HTMLInputElement>
  //     | React.ChangeEvent<HTMLTextAreaElement>
  // ) => void;
  handleSubmit: (
    event?: {
      preventDefault?: () => void;
    },
    chatRequestOptions?: ChatRequestOptions
  ) => void;
  className?: string;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { width } = useWindowSize();

  useEffect(() => {
    if (textareaRef.current) {
      adjustHeight();
    }
  }, []);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${
        textareaRef.current.scrollHeight + 2
      }px`;
    }
  };

  const [localStorageInput, setLocalStorageInput] = useLocalStorage(
    "input",
    ""
  );

  useEffect(() => {
    if (textareaRef.current) {
      const domValue = textareaRef.current.value;
      const finalValue = domValue || localStorageInput || "";
      setInput(finalValue);
      adjustHeight();
    }
  }, []);

  useEffect(() => {
    setLocalStorageInput(input);
  }, [input, setLocalStorageInput]);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
    adjustHeight();
  };

  const submitForm = useCallback(() => {
    handleSubmit();

    setLocalStorageInput("");

    if (width && width > 768) {
      textareaRef.current?.focus();
    }
  }, [handleSubmit, setLocalStorageInput, width]);

  return (
    <div className="relative w-full flex flex-col gap-4">
      {messages.length === 0 && (
        // attachments.length === 0 &&

        <div className="grid sm:grid-cols-2 gap-2 w-full">
          {suggestedActions.map((suggestedAction, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.05 * index }}
              key={index}
              className={index > 1 ? "hidden sm:block" : "block"}
            >
              <Button
                variant="ghost"
                onClick={async () => {
                  append(suggestedAction.action);
                }}
                className="text-left border rounded-xl px-4 py-3.5 text-sm flex-1 gap-1 sm:flex-col w-full h-auto justify-start items-start"
              >
                <span className="font-medium">{suggestedAction.title}</span>
                <span className="text-muted-foreground">
                  {suggestedAction.label}
                </span>
              </Button>
            </motion.div>
          ))}
        </div>
      )}

      {/* <input
        type="file"
        className="fixed -top-4 -left-4 size-0.5 opacity-0 pointer-events-none"
        ref={fileInputRef}
        multiple
        onChange={handleFileChange}
        tabIndex={-1}
      /> */}

      <Textarea
        ref={textareaRef}
        placeholder="Send a message..."
        value={input}
        onChange={handleInput}
        className={cx(
          "min-h-[24px] overflow-hidden resize-none rounded-xl text-base bg-muted",
          className
        )}
        rows={1}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();

            if (isLoading) {
              toast.error("Please wait for the model to finish its response!");
            } else {
              submitForm();
            }
          }
        }}
      />

      {isLoading ? (
        <Button
          className="rounded-full p-1.5 h-fit absolute bottom-2 right-2 m-0.5"
          onClick={(event) => {
            event.preventDefault();
            stop();
            // setMessages((messages) => sanitizeUIMessages(messages));
          }}
        >
          <StopIcon size={14} />
        </Button>
      ) : (
        <Button
          className="rounded-full p-1.5 h-fit absolute bottom-2 right-2 m-0.5"
          onClick={(event) => {
            event.preventDefault();
            submitForm();
          }}
          disabled={input.length === 0}
        >
          <ArrowUpIcon size={14} />
        </Button>
      )}
    </div>
  );
}
