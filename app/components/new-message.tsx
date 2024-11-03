"use client";

import { StreamableValue, useStreamableValue } from "ai/rsc";
import { Markdown } from "./markdown";

export function Message({ textStream }: { textStream: StreamableValue }) {
  const [text] = useStreamableValue(textStream);

  return (
    <div className="flex flex-col gap-4">
      <Markdown>{text}</Markdown>
    </div>
  );
}
