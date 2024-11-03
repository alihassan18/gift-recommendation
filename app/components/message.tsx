"use client";

import { Attachment, ToolInvocation } from "ai";
import cx from "classnames";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import React, { Dispatch, ReactNode, SetStateAction } from "react";

import { Markdown } from "./markdown";
import ProductCard from "./product-card";
import { DocumentToolCall, DocumentToolResult } from "./document";
import { ClientMessage } from "../actions";
// import { Weather } from './weather';

export const Message = ({
  message,
}: // toolInvocations,
// attachments,
{
  message: ClientMessage;
}) => {
  const role = message.status == "user.message.created" ? "user" : "assistant";
  // const guiValue =
  //   React.isValidElement(message.gui) && message.gui.props.children?.length > 0
  //     ? message.gui
  //     : null;

  return (
    <motion.div
      className="w-full mx-auto max-w-3xl px-4 group/message "
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      data-role={role}
    >
      <div
        className={cx(
          "flex gap-4 group-data-[role=user]/message:px-5 w-full group-data-[role=user]/message:w-fit group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl group-data-[role=user]/message:py-3.5 rounded-xl",
          {
            "group-data-[role=user]/message:bg-muted": "",
            "group-data-[role=user]/message:bg-zinc-300 dark:group-data-[role=user]/message:bg-zinc-800":
              "",
          }
        )}
      >
        {role === "assistant" && (
          <div className="size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border">
            <Sparkles className="size-4" />
          </div>
        )}
        <div key={message.id} className="flex flex-col gap-2 w-full ">
          <div className="flex flex-row justify-between">
            <div className="text-sm text-zinc-500">{message.status}</div>
          </div>
          {/* {message?.gui ? (
            <div className="flex flex-col gap-4">{message.gui}</div>
          ) : (
            <div>{message.text}</div>
          )} */}

          {message.text}
          {message.gui}
          {/* {message.text} */}
          {/* {toolInvocations && toolInvocations.length > 0 && (
            <div className="flex flex-col gap-4">
              {toolInvocations.map((toolInvocation) => {
                const { toolName, toolCallId, state, args } = toolInvocation;

                if (state === "result") {
                  const { result } = toolInvocation;

                  return (
                    <div key={toolCallId}>
                      {toolName === "getWeather" ? (
                        <ProductCard product={result} />
                      ) : toolName === "createDocument" ? (
                        <DocumentToolResult
                          type="create"
                          result={result}
                          // canvas={canvas}
                          // setCanvas={setCanvas}
                        />
                      ) : toolName === "updateDocument" ? (
                        <DocumentToolResult
                          type="update"
                          result={result}
                          // canvas={canvas}
                          // setCanvas={setCanvas}
                        />
                      ) : toolName === "requestSuggestions" ? (
                        <DocumentToolResult
                          type="request-suggestions"
                          result={result}
                          // canvas={canvas}
                          // setCanvas={setCanvas}
                        />
                      ) : (
                        <pre>{JSON.stringify(result, null, 2)}</pre>
                      )}
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={toolCallId}
                      className={cx({
                        skeleton: ["getWeather"].includes(toolName),
                      })}
                    >
                      {toolName === "getWeather" ? (
                        <ProductCard product={undefined} />
                      ) : toolName === "createDocument" ? (
                        <DocumentToolCall type="create" args={args} />
                      ) : toolName === "updateDocument" ? (
                        <DocumentToolCall type="update" args={args} />
                      ) : toolName === "requestSuggestions" ? (
                        <DocumentToolCall
                          type="request-suggestions"
                          args={args}
                        />
                      ) : null}
                    </div>
                  );
                }
              })}
            </div>
          )} */}
        </div>
      </div>
    </motion.div>
  );
};
