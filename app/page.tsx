"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import { getWeather } from "./utils/weather";
import WeatherWidget from "./components/weather-widget";
import FileViewer from "./components/file-viewer";
import Chat from "./components/chat";

const Home = () => {
  const [weatherData, setWeatherData] = useState({});

  const functionCallHandler = async (call) => {
    if (call?.function?.name !== "recommend_product") return;
    const args = JSON.parse(call.function.arguments);
    console.log(args, "args");

    const data = getWeather(args.location);
    setWeatherData(data);
    return JSON.stringify(data);
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.column}>
          <WeatherWidget {...weatherData} />
          <FileViewer />
        </div>
        <div className={styles.chatContainer}>
          <div className={styles.chat}>
            <Chat functionCallHandler={functionCallHandler} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;

// "use client";

// import React from "react";
// import styles from "./page.module.css";

// const Home = () => {
//   const categories = {
//     "Basic chat": "basic-chat",
//     "Function calling": "function-calling",
//     "File search": "file-search",
//     All: "all",
//   };

//   return (
//     <main className={styles.main}>
//       <div className={styles.title}>
//         Explore sample apps built with Assistants API
//       </div>
//       <div className={styles.container}>
//         {Object.entries(categories).map(([name, url]) => (
//           <a key={name} className={styles.category} href={`/examples/${url}`}>
//             {name}
//           </a>
//         ))}
//       </div>
//     </main>
//   );
// };

// export default Home;
