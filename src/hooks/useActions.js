import { useGame } from "../hooks/useGame";
import { useRooms } from "../hooks/useRooms";

export function useActions() {
  const { dispatch: dispatchGame } = useGame();
  const { dispatch: dispatchRooms } = useRooms();

  ///////////////////////
  // MOVE
  ///////////////////////
  function move(actionName, actionParams, room, user) {
    // Check for existing room for given params
    if (actionName === "MOVE" && actionParams) {
      const existingRoom = room.doors.find(
        (room) => room.direction === actionParams
      );

      if (!existingRoom)
        return alert(`MOVE ${actionParams} is not a valid command.`);

      // Message to display
      const moveMessage = `You have successfully been moved to Room ${
        room.number + 1
      }`;

      // Check for locked door
      if (room.monster?.lockedDoor === actionParams)
        return alert(
          `Door locked! You should defeat ${room.monster.name} first.`
        );

      // Check for the exit door
      if (existingRoom.roomNumber === 0) {
        // Check for Princess
        const princess = user.items.find((item) => item.id === "princess");

        return dispatchGame({
          type: "game/finish",
          payload: !princess ? "lose" : "win",
        });
      }

      dispatchGame({
        type: "game/move",
        payload: { number: existingRoom.roomNumber - 1, message: moveMessage },
      });
    }
  }

  ///////////////////////
  // PICK
  ///////////////////////
  function pick(actionName, actionParams, room, user) {
    // Check for existing items for given params
    if (actionName === "PICK" && actionParams) {
      const existingItem = room.items.find(
        (item) => item.id === actionParams.toLowerCase()
      );

      if (!existingItem || existingItem.length === 0)
        return alert(`PICK ${actionParams} is not a valid command.`);

      // Message to display
      const pickMessage = `You picked up ${existingItem.name}`;

      // Check number of items
      if (user.items.length > 9)
        return alert(`Your bag is full. Drop some items.`);

      dispatchGame({
        type: "game/pick",
        payload: { item: existingItem, message: pickMessage },
      });

      dispatchRooms({
        type: "room/removeItem",
        payload: { item: existingItem, id: room.number },
      });
    }
  }

  ///////////////////////
  // DROP
  ///////////////////////
  function drop(actionName, actionParams, room, user) {
    if (actionName === "DROP" && actionParams) {
      const existingItem = user.items.find(
        (item) => item.id === actionParams.toLowerCase()
      );

      if (!existingItem)
        return alert(`DROP ${actionParams} is not a valid command.`);

      // Message to display
      const dropMessage = `You dropped ${existingItem.name}`;

      // Check number of items
      if (room.items.length > 4)
        return alert(`You can't drop more than 5 items in this room.`);

      dispatchGame({
        type: "game/drop",
        payload: { item: existingItem, message: dropMessage },
      });

      dispatchRooms({
        type: "room/addItem",
        payload: { item: existingItem, id: room.number },
      });
    }
  }

  ///////////////////////
  // LOOK
  ///////////////////////
  function look(actionName, room, descriptions, currentRoom) {
    if (actionName === "LOOK") {
      // Message to display
      const lookMessage = `
        ${descriptions[0].rooms[currentRoom]}

        Items: ${room.items.map((item) => {
          return item.name;
        })}

        Doors: ${room.doors.map((item) => {
          return item.direction;
        })}
        `;

      dispatchGame({
        type: "game/look",
        payload: lookMessage,
      });
    }
  }

  ///////////////////////
  // ATTACK
  ///////////////////////
  function attack(actionName, room, user) {
    if (actionName === "ATTACK") {
      // Check for monsters
      if (!room.monster) return alert(`No monsters to attack.`);

      // Message to display
      const attackMessage = `You defeated ${room.monster.name}. Door unlocked!`;

      // Check if user have required item
      const userRequiredItem = user.items.find(
        (item) => item.id === room.monster.requiredItem
      );

      // Monster defeated
      if (userRequiredItem) {
        dispatchGame({
          type: "game/attack",
          payload: attackMessage,
        });

        dispatchRooms({
          type: "room/monsterDefeated",
          payload: room,
        });
      }

      // Monster not defeated - Game Lose
      if (!userRequiredItem)
        dispatchGame({
          type: "game/finish",
          payload: "dead",
        });
    }
  }

  ///////////////////////
  // EXIT
  ///////////////////////
  function exit(actionName) {
    if (actionName === "EXIT") {
      dispatchRooms({
        type: "room/exit",
      });

      dispatchGame({
        type: "game/exit",
      });
    }
  }

  return { move, pick, drop, look, attack, exit };
}
