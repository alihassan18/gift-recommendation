"use client";

import React from "react";
import Chat from "./components/chat";

const FunctionCalling = () => {
  return (
    <main className="flex flex-col min-w-0 h-dvh bg-background">
      <Chat /* functionCallHandler={functionCallHandler} */ />
    </main>
  );
};

export default FunctionCalling;
