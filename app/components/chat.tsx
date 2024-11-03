"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./chat.module.css";
import Markdown from "react-markdown";
import { RequiredActionFunctionToolCall } from "openai/resources/beta/threads/runs/runs";
import { Overview } from "./overview";
import { MultimodalInput } from "./multimodal-input";
import { useScrollToBottom } from "./use-scroll-to-bottom";
import { Message as PreviewMessage } from "./message";
import { ClientMessage } from "../actions";
import { useActions } from "ai/rsc";

const UserMessage = ({ text }: { text: string }) => {
  return <div className={styles.userMessage}>{text}</div>;
};

const AssistantMessage = ({ text }: { text: string }) => {
  return (
    <div className={styles.assistantMessage}>
      <Markdown>{text}</Markdown>
    </div>
  );
};

const CodeMessage = ({ text }: { text: string }) => {
  return (
    <div className={styles.codeMessage}>
      {text.split("\n").map((line, index) => (
        <div key={index}>
          <span>{`${index + 1}. `}</span>
          {line}
        </div>
      ))}
    </div>
  );
};

type ChatProps = {
  functionCallHandler?: (
    toolCall: RequiredActionFunctionToolCall
  ) => Promise<string>;
};

const Chat =
  ({}: // functionCallHandler = () => Promise.resolve(""), // default to return empty string
  ChatProps) => {
    const [messagesContainerRef, messagesEndRef] =
      useScrollToBottom<HTMLDivElement>();

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<ClientMessage[]>([]);
    const { submitMessage } = useActions();
    // const [messages, setMessages] = useUIState();

    const handleSubmission = async () => {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: "123",
          status: "user.message.created",
          text: input,
          gui: null,
        },
      ]);

      const response = await submitMessage(input);
      setMessages((currentMessages) => [...currentMessages, response]);
      setInput("");
    };

    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => {
      scrollToBottom();
    }, [messages]);
    console.log(messages, "messages");

    const appendMessage = async (input) => {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: "123",
          status: "user.message.created",
          text: input,
          gui: null,
        },
      ]);

      const response = await submitMessage(input);
      setMessages((currentMessages) => [...currentMessages, response]);
      setInput("");
    };

    return (
      <div className="flex flex-col min-w-0 h-dvh bg-background">
        <div
          className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll"
          ref={messagesContainerRef}
        >
          {messages.length === 0 && <Overview />}

          {/* {messages.map((msg, index) => (
          <Message key={index} role={msg.role} text={msg.text} />
        ))} */}
          {messages.map((message) => (
            // <p>{message.text}</p>
            <PreviewMessage message={message} />
            // <PreviewMessage
            //   key={message.id}
            //   role={"user"}
            //   content={message.text}
            //   // attachments={message.experimental_attachments}
            //   // toolInvocations={message.toolInvocations}
            //   // canvas={canvas}
            //   // setCanvas={setCanvas}
            // />
          ))}
          <div
            ref={messagesEndRef}
            className="shrink-0 min-w-[24px] min-h-[24px]"
          />
        </div>

        <form className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
          <MultimodalInput
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmission}
            isLoading={false}
            stop={() => {
              console.log("test");
            }}
            // stop={stop}
            // attachments={attachments}
            // setAttachments={setAttachments}
            messages={messages}
            setMessages={setMessages}
            append={appendMessage}
          />
        </form>
      </div>
    );
  };

export default Chat;
