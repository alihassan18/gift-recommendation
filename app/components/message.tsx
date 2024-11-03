"use client";
import cx from "classnames";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { ClientMessage } from "../actions";

export const Message = ({ message }: { message: ClientMessage }) => {
  const role = message.status == "user.message.created" ? "user" : "assistant";

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

          {message.text}
          {message.gui}
        </div>
      </div>
    </motion.div>
  );
};
