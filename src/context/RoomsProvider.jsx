import { useReducer } from "react";
import { RoomsContext } from "./RoomsContext";

///////////////////////
// initialState
///////////////////////
const initialState = {
  rooms: [
    {
      number: 1,
      items: [],
      monster: null,
      doors: [
        {
          direction: "EAST",
          roomNumber: 2,
        },
        {
          direction: "SOUTH",
          roomNumber: 4,
        },
        {
          direction: "WEST",
          roomNumber: 0,
        },
      ],
    },
    {
      number: 2,
      items: [{ name: "Golden Egg", id: "egg", value: 0.5 }],
      monster: null,
      doors: [
        {
          direction: "EAST",
          roomNumber: 3,
        },
        {
          direction: "SOUTH",
          roomNumber: 5,
        },
        {
          direction: "WEST",
          roomNumber: 1,
        },
      ],
    },
    {
      number: 3,
      items: [{ name: "Magical Shield", id: "shield", value: 0 }],
      monster: null,
      doors: [
        {
          direction: "WEST",
          roomNumber: 2,
        },
      ],
    },
    {
      number: 4,
      items: [{ name: "Golden Chalice", id: "chalice", value: 0.5 }],

      monster: null,
      doors: [
        {
          direction: "NORTH",
          roomNumber: 1,
        },
      ],
    },
    {
      number: 5,
      items: [],
      monster: {
        name: "Medusa",
        requiredItem: "shield",
        active: true,
        lockedDoor: "SOUTH",
      },
      doors: [
        {
          direction: "NORTH",
          roomNumber: 2,
        },
        {
          direction: "EAST",
          roomNumber: 6,
        },
        {
          direction: "SOUTH",
          roomNumber: 8,
        },
      ],
    },
    {
      number: 6,
      items: [],
      monster: {
        name: "Dracula",
        requiredItem: "dagger",
        active: true,
        lockedDoor: "SOUTH",
      },
      doors: [
        {
          direction: "WEST",
          roomNumber: 5,
        },
        {
          direction: "SOUTH",
          roomNumber: 9,
        },
      ],
    },
    {
      number: 7,
      items: [{ name: "Silver Dagger", id: "dagger", value: 0 }],

      monster: null,
      doors: [
        {
          direction: "EAST",
          roomNumber: 8,
        },
      ],
    },
    {
      number: 8,
      items: [{ name: "Piece of Paper", id: "paper", value: 1 }],
      monster: null,
      doors: [
        {
          direction: "WEST",
          roomNumber: 7,
        },
        {
          direction: "NORTH",
          roomNumber: 5,
        },
      ],
    },
    {
      number: 9,
      items: [{ name: "Princess", id: "princess", value: 0 }],
      monster: null,
      doors: [
        {
          direction: "NORTH",
          roomNumber: 6,
        },
      ],
    },
  ],
};

///////////////////////
// Reducer
///////////////////////
function reducer(state, action) {
  switch (action.type) {
    case "room/removeItem":
      return {
        ...state,
        rooms: state.rooms.map((room) =>
          room.number === action.payload.id
            ? {
                ...room,
                items: room.items.filter(
                  (item) => item.id !== action.payload.item.id
                ),
              }
            : room
        ),
      };

    case "room/addItem":
      return {
        ...state,
        rooms: state.rooms.map((room) =>
          room.number === action.payload.id
            ? {
                ...room,
                items: [...room.items, action.payload.item],
              }
            : room
        ),
      };

    case "room/monsterDefeated":
      return {
        ...state,
        rooms: state.rooms.map((room) =>
          room.number === action.payload.number
            ? {
                ...room,
                monster: { ...room.monster, active: false, lockedDoor: false },
              }
            : room
        ),
      };

    case "room/exit":
      return {
        ...initialState,
      };
  }
}

///////////////////////
// Provider
///////////////////////
export default function RoomsProvider({ children }) {
  const [{ rooms }, dispatch] = useReducer(reducer, initialState);

  return (
    <RoomsContext.Provider value={{ rooms, dispatch }}>
      {children}
    </RoomsContext.Provider>
  );
}
