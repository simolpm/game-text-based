import { useGame } from "../hooks/useGame";

function FinishScreen() {
  const { finishStatus, descriptions } = useGame();

  return (
    <main>
      <h2>Game Over</h2>
      {finishStatus === "win" && (
        <p className="text-green-500">{descriptions[0].endWin}</p>
      )}
      {finishStatus === "lose" && (
        <p className="text-red-700">{descriptions[0].endLose}</p>
      )}
      {finishStatus === "dead" && (
        <p className="text-red-700">{descriptions[0].endDead}</p>
      )}
    </main>
  );
}

export default FinishScreen;
