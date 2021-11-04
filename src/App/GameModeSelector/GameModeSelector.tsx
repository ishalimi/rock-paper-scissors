import { GameMode } from "../../model/GameMode";

export const GameModeSelector = ({ onGameModeSelection }: { onGameModeSelection(gameMode: GameMode): void; }) => (
  <div className='row' style={{ height: '100vh', paddingTop: '20vh' }}>
    <div className='col-12'>
      <h1 className='text-center'>
        Select Game Mode
      </h1>
    </div>
    <div className='col-4 text-center'>
      <h4 className='border pt-5 pb-5 hovered' onClick={() => onGameModeSelection(GameMode.PlayerVsPlayer)}>
        Player VS Player
      </h4>
    </div>
    <div className='col-4 text-center'>
      <h4 className='border pt-5 pb-5 hovered' onClick={() => onGameModeSelection(GameMode.PlayerVsComputer)}>
        Player VS Dumb Computer
      </h4>
    </div>
    <div className='col-4 text-center'>
      <h4 className='border pt-5 pb-5 hovered' onClick={() => onGameModeSelection(GameMode.PlayerVsSmartComputer)}>
        Player VS Computer
      </h4>
    </div>
  </div>
);
