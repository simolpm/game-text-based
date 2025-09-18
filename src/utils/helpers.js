export function checkActionInput(input) {
  // Check for valid input
  if (
    input !== "MOVE" &&
    input !== "PICK" &&
    input !== "DROP" &&
    input !== "ATTACK" &&
    input !== "EXIT" &&
    input !== "LOOK"
  )
    alert(
      `Not a valid command. Please try:
         - MOVE (e.g. MOVE EAST)
         - PICK  (e.g. PICK EGG)
         - DROP  (e.g. DROP EGG)
         - ATTACK
         - EXIT
         - LOOK`
    );
}
