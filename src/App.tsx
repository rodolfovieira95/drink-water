import "./App.css";
import { useState } from "react";
import { useNotification } from "./hooks/useNotification";
import { setInterval, clearInterval } from "worker-timers";

function App() {
  const [isRunning, setIsRunning] = useState(false);
  let timeoutId: number;

  const handleStart = () => {
    const oneSecond = 1000;
    // const oneMinute = 1000 * 60;
    // const oneHour = 1000 * 60 * 60;
    timeoutId = setInterval(() => {
      // do something once
      useNotification({
        title: "Drink Water",
        body: "Beba Água!",
      });
    }, 10 * oneSecond);
    setIsRunning(true);
  };

  const handleStop = async () => {
    setIsRunning(false);
    if (!timeoutId) return;
    clearInterval(timeoutId);
  };
  return (
    <body className="arrow">
      <div className="container">
        <h1>Beba Água!</h1>
        <button onClick={handleStart}>Beber Água</button>
        <button onClick={handleStop}>Parar Alarme</button>
        {isRunning ? (
          <p style={{ color: "green" }}>Alarme Ligado</p>
        ) : (
          <p style={{ color: "red" }}>Alarme Desligado</p>
        )}
      </div>
    </body>
  );
}

export default App;
