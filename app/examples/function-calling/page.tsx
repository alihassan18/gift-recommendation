"use client";

import React, { useState } from "react";
import styles from "../shared/page.module.css";
import Chat from "../../components/chat";
import WeatherWidget from "../../components/weather-widget";
import { getWeather } from "../../utils/weather";
import { RequiredActionFunctionToolCall } from "openai/resources/beta/threads/runs/runs";
import ProductCard, { Product } from "@/app/components/product-card";

interface WeatherData {
  location?: string;
  temperature?: number;
  conditions?: string;
}

const FunctionCalling = () => {
  // const [product, setProduct] = useState<Product>({});
  // const isEmpty = Object.keys(product).length === 0;

  // const functionCallHandler = async (call: RequiredActionFunctionToolCall) => {
  //   if (call?.function?.name !== "recommend_product") return;
  //   const args = JSON.parse(call.function.arguments);
  //   console.log(args, "args");

  //   const data = args.product;
  //   // const data = getWeather(args.location);
  //   setProduct(data);
  //   return JSON.stringify(data);
  // };

  return (
    <main className="flex flex-col min-w-0 h-dvh bg-background">
      <Chat /* functionCallHandler={functionCallHandler} */ />
    </main>
    // <main className={styles.main}>
    //   <div className={styles.container}>
    //     <div className={styles.column}>
    //       {!isEmpty && <ProductCard product={product} />}
    //     </div>
    //     <div className={styles.chatContainer}>
    //       <div className={styles.chat}>
    //         <Chat functionCallHandler={functionCallHandler} />
    //       </div>
    //     </div>
    //   </div>
    // </main>
  );
};

export default FunctionCalling;

// "use client";

// import { useState } from "react";
// import { useActions } from "ai/rsc";
// import { ClientMessage } from "@/app/actions";

// export default function Home() {
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState<ClientMessage[]>([]);
//   const { submitMessage } = useActions();

//   const handleSubmission = async () => {
//     setMessages((currentMessages) => [
//       ...currentMessages,
//       {
//         id: "123",
//         status: "user.message.created",
//         text: input,
//         gui: null,
//       },
//     ]);

//     const response = await submitMessage(input);
//     setMessages((currentMessages) => [...currentMessages, response]);
//     setInput("");
//   };

//   return (
//     <main className="flex flex-col min-w-0 h-dvh bg-background">
//       <div className="flex flex-row gap-2 p-2 bg-zinc-100 w-full">
//         <input
//           className="bg-zinc-100 w-full p-2 outline-none"
//           value={input}
//           onChange={(event) => setInput(event.target.value)}
//           placeholder="Ask a question"
//           onKeyDown={(event) => {
//             if (event.key === "Enter") {
//               handleSubmission();
//             }
//           }}
//         />
//         <button
//           className="p-2 bg-zinc-900 text-zinc-100 rounded-md"
//           onClick={handleSubmission}
//         >
//           Send
//         </button>
//       </div>

//       <div className="flex flex-col h-[calc(100dvh-56px)] overflow-y-scroll">
//         <div>
//           {messages.map((message) => (
//             <div key={message.id} className="flex flex-col gap-1 border-b p-2">
//               <div className="flex flex-row justify-between">
//                 <div className="text-sm text-zinc-500">{message.status}</div>
//               </div>
//               {message.gui ? (
//                 <div className="flex flex-col gap-2">{message.gui}</div>
//               ) : (
//                 <div>{message.text}</div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// }
