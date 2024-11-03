"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./chat.module.css";
<<<<<<< HEAD
import { AssistantStream } from "openai/lib/AssistantStream";
import Markdown from "react-markdown";
// @ts-expect-error - no types for this yet
import { AssistantStreamEvent } from "openai/resources/beta/assistants/assistants";
import { RequiredActionFunctionToolCall } from "openai/resources/beta/threads/runs/runs";
import { Textarea } from "./textarea";
import { cn } from "../lib/utils";
import { Button } from "./button";
import { ArrowUpIcon, StopIcon } from "./icons";
import { Overview } from "./overview";
import { MultimodalInput } from "./multimodal-input";
import { useScrollToBottom } from "./use-scroll-to-bottom";
import { useAssistant, Message } from "ai/react";
import { Message as PreviewMessage } from "./message";
import { ClientMessage } from "../actions";
import { useActions, useUIState } from "ai/rsc";
import { Message as PreviewMessageNew } from "./new-message";

// type MessageProps = {
//   role: "user" | "assistant" | "code";
//   text: string;
// };
=======
import Markdown from "react-markdown";
import { RequiredActionFunctionToolCall } from "openai/resources/beta/threads/runs/runs";
import { Overview } from "./overview";
import { MultimodalInput } from "./multimodal-input";
import { useScrollToBottom } from "./use-scroll-to-bottom";
import { Message as PreviewMessage } from "./message";
import { ClientMessage } from "../actions";
import { useActions } from "ai/rsc";
>>>>>>> ebcacad0cb8935af78f00c1e49b35ca294f14fe4

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

<<<<<<< HEAD
// const Message = ({ role, text }: MessageProps) => {
//   switch (role) {
//     case "user":
//       return <UserMessage text={text} />;
//     case "assistant":
//       return <AssistantMessage text={text} />;
//     case "code":
//       return <CodeMessage text={text} />;
//     default:
//       return null;
//   }
// };

=======
>>>>>>> ebcacad0cb8935af78f00c1e49b35ca294f14fe4
type ChatProps = {
  functionCallHandler?: (
    toolCall: RequiredActionFunctionToolCall
  ) => Promise<string>;
};

const Chat =
  ({}: // functionCallHandler = () => Promise.resolve(""), // default to return empty string
  ChatProps) => {
<<<<<<< HEAD
    // const [input, setInput] = useState("");
    // const [messages, setMessages] = useState([]);
    // const [inputDisabled, setInputDisabled] = useState(false);
    // const [threadId, setThreadId] = useState("");
=======
>>>>>>> ebcacad0cb8935af78f00c1e49b35ca294f14fe4
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

<<<<<<< HEAD
    // const {
    //   status,
    //   submitMessage,
    //   handleInputChange,
    //   input,
    //   setInput,
    //   append,
    //   messages,
    //   setMessages,
    //   threadId,
    //   setThreadId,
    //   stop,
    //   error,
    // } = useAssistant({
    //   api: "/api/assistants",
    //   body: {},
    // });
    // console.log(status, "status");

    // const isLoading = status == "in_progress";

    // automatically scroll to bottom of chat
    // const messagesEndRef = useRef<HTMLDivElement | null>(null);
=======
>>>>>>> ebcacad0cb8935af78f00c1e49b35ca294f14fe4
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => {
      scrollToBottom();
    }, [messages]);
    console.log(messages, "messages");

<<<<<<< HEAD
    // create a new threadID when chat component created
    // useEffect(() => {
    //   const createThread = async () => {
    //     const res = await fetch(`/api/assistants/threads`, {
    //       method: "POST",
    //     });
    //     const data = await res.json();
    //     setThreadId(data.threadId);
    //   };
    //   createThread();
    // }, []);

    // const sendMessage = async (text) => {
    //   const response = await fetch(
    //     `/api/assistants/threads/${threadId}/messages`,
    //     {
    //       method: "POST",
    //       body: JSON.stringify({
    //         content: text,
    //       }),
    //     }
    //   );
    //   const stream = AssistantStream.fromReadableStream(response.body);
    //   handleReadableStream(stream);
    // };

    // const submitActionResult = async (runId, toolCallOutputs) => {
    //   const response = await fetch(
    //     `/api/assistants/threads/${threadId}/actions`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         runId: runId,
    //         toolCallOutputs: toolCallOutputs,
    //       }),
    //     }
    //   );
    //   const stream = AssistantStream.fromReadableStream(response.body);
    //   handleReadableStream(stream);
    // };

    // const handleSubmit = (e) => {
    //   e.preventDefault();
    //   if (!input.trim()) return;
    //   sendMessage(input);
    //   setMessages((prevMessages) => [
    //     ...prevMessages,
    //     { role: "user", content: input, id: "test" },
    //   ]);
    //   setInput("");
    //   setInputDisabled(true);
    //   scrollToBottom();
    // };

    /* Stream Event Handlers */

    // textCreated - create new assistant message
    // const handleTextCreated = () => {
    //   append({ role: "assistant", content: "" });
    // };

    // textDelta - append text to last assistant message
    // const handleTextDelta = (delta) => {
    //   if (delta.value != null) {
    //     appendToLastMessage(delta.value);
    //   }
    //   if (delta.annotations != null) {
    //     annotateLastMessage(delta.annotations);
    //   }
    // };

    // imageFileDone - show image in chat
    // const handleImageFileDone = (image) => {
    //   appendToLastMessage(`\n![${image.file_id}](/api/files/${image.file_id})\n`);
    // };

    // toolCallCreated - log new tool call
    // const toolCallCreated = (toolCall) => {
    //   if (toolCall.type != "code_interpreter") return;
    //   append({ role: "tool", content: "" });
    // };

    // toolCallDelta - log delta and snapshot for the tool call
    // const toolCallDelta = (delta, snapshot) => {
    //   if (delta.type != "code_interpreter") return;
    //   if (!delta.code_interpreter.input) return;
    //   appendToLastMessage(delta.code_interpreter.input);
    // };

    // handleRequiresAction - handle function call
    // const handleRequiresAction = async (
    //   event: AssistantStreamEvent.ThreadRunRequiresAction
    // ) => {
    //   const runId = event.data.id;
    //   const toolCalls = event.data.required_action.submit_tool_outputs.tool_calls;
    //   // loop over tool calls and call function handler
    //   const toolCallOutputs = await Promise.all(
    //     toolCalls.map(async (toolCall) => {
    //       const result = await functionCallHandler(toolCall);
    //       return { output: result, tool_call_id: toolCall.id };
    //     })
    //   );
    //   setInputDisabled(true);
    //   submitActionResult(runId, toolCallOutputs);
    // };

    // handleRunCompleted - re-enable the input form
    // const handleRunCompleted = () => {
    //   setInputDisabled(false);
    // };

    // const handleReadableStream = (stream: AssistantStream) => {
    //   // messages
    //   stream.on("textCreated", handleTextCreated);
    //   stream.on("textDelta", handleTextDelta);

    //   // image
    //   stream.on("imageFileDone", handleImageFileDone);

    //   // code interpreter
    //   stream.on("toolCallCreated", toolCallCreated);
    //   stream.on("toolCallDelta", toolCallDelta);

    //   // events without helpers yet (e.g. requires_action and run.done)
    //   stream.on("event", (event) => {
    //     if (event.event === "thread.run.requires_action")
    //       handleRequiresAction(event);
    //     if (event.event === "thread.run.completed") handleRunCompleted();
    //   });
    // };

    /*
    =======================
    === Utility Helpers ===
    =======================
  */

    // const appendToLastMessage = (text) => {
    //   setMessages((prevMessages) => {
    //     const lastMessage = prevMessages[prevMessages.length - 1];
    //     const updatedLastMessage = {
    //       ...lastMessage,
    //       content: lastMessage.content + text,
    //     };
    //     return [...prevMessages.slice(0, -1), updatedLastMessage];
    //   });
    // };

    // const appendMessage = (role, text) => {
    //   setMessages((prevMessages) => [...prevMessages, { role, text }]);
    // };

=======
>>>>>>> ebcacad0cb8935af78f00c1e49b35ca294f14fe4
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

<<<<<<< HEAD
    // const annotateLastMessage = (annotations) => {
    //   setMessages((prevMessages) => {
    //     const lastMessage = prevMessages[prevMessages.length - 1];
    //     const updatedLastMessage = {
    //       ...lastMessage,
    //     };
    //     annotations.forEach((annotation) => {
    //       if (annotation.type === "file_path") {
    //         updatedLastMessage.content = updatedLastMessage.content.replaceAll(
    //           annotation.text,
    //           `/api/files/${annotation.file_path.file_id}`
    //         );
    //       }
    //     });
    //     return [...prevMessages.slice(0, -1), updatedLastMessage];
    //   });
    // };

    // const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    //   setInput(event.target.value);
    //   // adjustHeight();
    // };

=======
>>>>>>> ebcacad0cb8935af78f00c1e49b35ca294f14fe4
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
<<<<<<< HEAD
        {/* Input form */}
        {/* <MultimodalInput /> */}
        {/* <form className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
        <Textarea
          // ref={textareaRef}
          placeholder="Send a message..."
          value={userInput}
          onChange={handleInput}
          className={cn(
            "min-h-[24px] overflow-hidden resize-none rounded-xl text-base bg-muted"
            // className
          )}
          rows={1}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();

              // if (isLoading) {
              //   toast.error(
              //     "Please wait for the model to finish its response!"
              //   );
              // } else {
              //   // handleSubmit();
              // }
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
              // submitForm();
            }}
            disabled={userInput.length === 0}
          >
            <ArrowUpIcon size={14} />
          </Button>
        )}
      </form> */}
=======
>>>>>>> ebcacad0cb8935af78f00c1e49b35ca294f14fe4
      </div>
    );
  };

export default Chat;
