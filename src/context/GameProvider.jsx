import { useEffect, useReducer } from "react";
import { GameContext } from "./GameContext";

///////////////////////
// initialState
///////////////////////
const initialState = {
  status: "loading", // ready, active, loading, finished
  descriptions: [],
  user: {
    name: null,
    items: [],
    cash: 0,
    moves: 0,
  },
  currentRoom: 0, // 0 -> Room 1
  message: "",
  finishStatus: null, // win, lose, dead
};

///////////////////////
// Reducer
///////////////////////
function reducer(state, action) {
  switch (action.type) {
    case "game/dataReceived":
      return {
        ...state,
        status: "ready",
        descriptions: action.payload,
      };

    case "game/dataFailed":
      return {
        ...state,
        status: "error",
      };

    case "game/startGame":
      return {
        ...state,
        status: "active",
        user: { ...state.user, name: action.payload },
      };

    case "game/move":
      return {
        ...state,
        currentRoom: action.payload.number,
        user: { ...state.user, moves: state.user.moves + 1 },
        message: action.payload.message,
      };

    case "game/pick":
      return {
        ...state,
        user: {
          ...state.user,
          items: [...state.user.items, action.payload.item],
          cash: state.user.cash + action.payload.item.value,
        },
        message: action.payload.message,
      };

    case "game/drop":
      return {
        ...state,
        user: {
          ...state.user,
          items: state.user.items.filter(
            (item) => item.id !== action.payload.item.id
          ),
          cash: state.user.cash - action.payload.item.value,
        },
        message: action.payload.message,
      };

    case "game/look":
      return {
        ...state,
        message: action.payload,
      };

    case "game/attack":
      return {
        ...state,
        message: action.payload,
      };

    case "game/finish":
      return {
        ...state,
        status: "finished",
        finishStatus: action.payload,
      };

    case "game/exit":
      return {
        ...initialState,
        descriptions: [...state.descriptions],
        status: "ready",
      };
  }
}

///////////////////////
// Provider
///////////////////////
export default function GameProvider({ children }) {
  const [
    { status, descriptions, user, rooms, currentRoom, message, finishStatus },
    dispatch,
  ] = useReducer(reducer, initialState);

  // Fetching Game Description from JSON
  useEffect(function () {
    async function fetchGameData() {
      try {
        const res = await fetch("http://localhost:9000/gameDescriptions");
        const data = await res.json();
        dispatch({ type: "game/dataReceived", payload: data });
      } catch (err) {
        console.error(err);
        dispatch({ type: "game/dataReceived" });
      }
    }
    fetchGameData();
  }, []);

  return (
    <GameContext.Provider
      value={{
        status,
        descriptions,
        user,
        rooms,
        currentRoom,
        finishStatus,
        message,
        dispatch,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
