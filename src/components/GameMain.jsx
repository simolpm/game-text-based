import { useState } from "react";
import { useGame } from "../hooks/useGame";
import { useRooms } from "../hooks/useRooms";

import { checkActionInput } from "../utils/helpers";
import { useActions } from "../hooks/useActions";
import StartScreen from "./StartScreen";
import FinishScreen from "./FinishScreen";
import ErrorScreen from "./ErrorScreen";

function GameMain() {
  const [actionInput, setActionInput] = useState("");
  const { status, descriptions, user, currentRoom, message } = useGame();
  const { rooms } = useRooms();
  const { move, pick, drop, look, attack, exit } = useActions();

  // Derived state
  const room = rooms[currentRoom];

  if (!descriptions.length) return <div>Loading...</div>;

  ///////////////////////
  // Actions Handler
  ///////////////////////
  function handleSetAction(e, room) {
    e.preventDefault();
    setActionInput("");

    // Destructuring input
    const [actionName, actionParams = null] = actionInput
      .toUpperCase()
      .split(" ");

    // Check valid action input
    checkActionInput(actionName);

    // Actions List
    move(actionName, actionParams, room, user);
    pick(actionName, actionParams, room, user);
    drop(actionName, actionParams, room, user);
    look(actionName, room, descriptions, currentRoom);
    attack(actionName, room, user);
    exit(actionName);
  }

  // Start Screen
  if (status === "ready") return <StartScreen />;

  // Error Screen
  if (status === "error") return <ErrorScreen />;

  // Game Screen
  return (
    <div className="bg-stone-950 text-white h-dvh flex flex-col p-8">
      <header className="mb-8 flex flex-col gap-4">
        <div> Hi, {user.name}</div>
        <h1 className="text-red-700">Text Based Game</h1>
        <div className="text-violet-500">{descriptions[0].start}</div>
      </header>

      {status === "active" && (
        <main className="flex flex-col gap-8">
          {/* Room Stats */}
          <div>
            {/* Message Box */}
            <p className="text-amber-200">{message}</p>

            {/* Current Room */}

            <p className="text-red-700">
              Currently you are in Room {room.number}
            </p>

            {/* Room Description */}
            <p className="text-red-700">{descriptions[0].rooms[currentRoom]}</p>

            {/* Doors Directions */}
            <p className="text-cyan-300">
              {room.doors.map((door) => (
                <span key={`door-${door.direction}`}>
                  {door.roomNumber
                    ? `There is a room to your ${door.direction}. `
                    : `There is an exit door to your ${door.direction}.`}
                </span>
              ))}
              {/* {room.doors.map((door) => console.log("PORTA", door.roomNumber))} */}
            </p>

            {/* Monster */}
            {room.monster && room.monster.active && (
              <p className="text-red-700">
                {room.monster.name} is waiting you beside a locked door.
              </p>
            )}

            {/* Monster - Defeated */}
            {room.monster && !room.monster.active && (
              <p className="text-green- 500">
                {room.monster.name} is lying on the floor.
              </p>
            )}

            {/* Room items */}
            <p className="text-cyan-50 flex flex-col">
              {room.items.map((item) => (
                <span key={item.id}>
                  The {item.name} is lying on the floor.
                </span>
              ))}
            </p>
          </div>

          {/* User Stats */}
          <div>
            {/* User Items List */}
            <div className="text-green-500">
              Your bag contains the following items :{" "}
              <ul>
                {user.items.length === 0
                  ? "Currently, your bag is empty."
                  : user.items.map((item) => (
                      <li key={item.id}>{item.name}</li>
                    ))}
              </ul>
            </div>

            {/* Current Cash */}
            <div className="text-blue-600">
              Current Cash is: {user.cash ? `${user.cash} million` : 0}
            </div>
          </div>

          {/* User Input Form */}
          <form
            className="text-amber-200 flex gap-4"
            onSubmit={(e) => handleSetAction(e, room)}
          >
            <label htmlFor="action">What do you want to do :</label>
            <input
              id="action"
              type="text"
              className="bg-stone-800"
              value={actionInput}
              onChange={(e) => setActionInput(e.target.value)}
            />
          </form>
        </main>
      )}

      {/* Finish Screen */}
      {status === "finished" && <FinishScreen />}
    </div>
  );
}

export default GameMain;
