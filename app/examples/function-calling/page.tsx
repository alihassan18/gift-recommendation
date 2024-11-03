"use client";

import Chat from "../../components/chat";

interface WeatherData {
  location?: string;
  temperature?: number;
  conditions?: string;
}

const FunctionCalling = () => {
  return (
    <main className="flex flex-col min-w-0 h-dvh bg-background">
      <Chat /* functionCallHandler={functionCallHandler} */ />
    </main>
  );
};

export default FunctionCalling;
