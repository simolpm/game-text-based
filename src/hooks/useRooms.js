import { useContext } from "react";
import { RoomsContext } from "../context/RoomsContext";

export function useRooms() {
  const context = useContext(RoomsContext);
  if (context === undefined)
    throw new Error("RoomsContext used outside RoomsProvider");

  return context;
}
