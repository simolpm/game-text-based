import { useState } from "react";
import { useGame } from "../hooks/useGame";

function StartScreen() {
  const [playerName, setPlayerName] = useState("");
  const { dispatch } = useGame();

  ///////////////////////
  // StarGame Handler
  ///////////////////////
  function handleStartGame(e) {
    e.preventDefault();
    dispatch({ type: "game/startGame", payload: playerName });
  }

  return (
    <main className="bg-stone-950 text-white h-dvh flex flex-col p-8">
      <form className="text-amber-200 flex gap-4" onSubmit={handleStartGame}>
        <label htmlFor="enterName">Enter your name:</label>
        <input
          type="text"
          id="enterName"
          className="bg-stone-800"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
      </form>
    </main>
  );
}

export default StartScreen;
