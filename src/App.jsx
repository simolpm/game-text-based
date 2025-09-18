import GameMain from "./components/GameMain";
import GameProvider from "./context/GameProvider.jsx";
import RoomsProvider from "./context/RoomsProvider.jsx";

function App() {
  return (
    <GameProvider>
      <RoomsProvider>
        <GameMain />
      </RoomsProvider>
    </GameProvider>
  );
}

export default App;
