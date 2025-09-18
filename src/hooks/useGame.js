import { useContext } from "react";
import { GameContext } from "../context/GameContext";

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined)
    throw new Error("GameContext used outside GameProvider");

  return context;
}
