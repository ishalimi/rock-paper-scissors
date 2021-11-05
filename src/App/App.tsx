import { useCallback, useEffect, useState } from "react";
import { Action } from "../model/Action";
import { Game } from "./Game/Game";
import { GameMode } from "../model/GameMode";
import { GameModeSelector } from "./GameModeSelector/GameModeSelector";
import { PlayerSelector } from "./PlayerSelector/PlayerSelector";
import { getRandomInInterval } from "../services/getRandomInInterval";
import { getLastElementOfArray } from "../services/getLastElementOfArray";
import { movesComparator } from "../services/movesComparator";
import { SelectedPlayer } from "../model/SelectedPlayer";

function App() {
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.None)
  const [selectedPlayer, setSelectedPlayer] = useState<SelectedPlayer>(SelectedPlayer.None);
  const [firstPlayerMoves, setFirstPlayerMoves] = useState<Action[]>([])
  const [secondPlayerMoves, setSecondPlayerMoves] = useState<Action[]>([])
  const [gameResult, setGameResult] = useState<string>('');
  const [firstPlayerWinsCounter, setFirstPlayerWinsCounter] = useState(0);
  const [secondPlayerWinsCounter, setSecondPlayerWinsCounter] = useState(0);
  const MAX_NB_GAMES = 3;

  const onSecondPlayerMoveChange = useCallback((action: Action) => {
    if (selectedPlayer === SelectedPlayer.SecondPlayer) {
      setSelectedPlayer(SelectedPlayer.FirstPlayer);
      setSecondPlayerMoves(prevMoves => [...prevMoves, action]);
    } else {
      if (gameMode === GameMode.PlayerVsPlayer) {
        alertMessage()
      } else {
        alert(`It's your turn!`)
      }
    }
  }, [gameMode, selectedPlayer])

  useEffect(() => {
    if (firstPlayerMoves.length > 0 && firstPlayerMoves.length === secondPlayerMoves.length) {
      const firstPlayerLastMove = getLastElementOfArray(firstPlayerMoves);
      const secondPlayerLastMove = getLastElementOfArray(secondPlayerMoves);

      const result = movesComparator(firstPlayerLastMove, secondPlayerLastMove);

      if (result === 1) {
        setFirstPlayerWinsCounter(prev => prev + 1);
      }

      if (result === -1) {
        setSecondPlayerWinsCounter(prev => prev + 1)
      }
    }
  }, [firstPlayerMoves, secondPlayerMoves, gameMode])

  useEffect(() => {
    if (firstPlayerWinsCounter + secondPlayerWinsCounter === MAX_NB_GAMES) {
      setGameResult(firstPlayerWinsCounter > secondPlayerWinsCounter ? 'First Player Won' : `${gameMode === GameMode.PlayerVsPlayer ? 'Second Player' : 'Computer'} Won`)
    }
  }, [gameMode, firstPlayerWinsCounter, secondPlayerWinsCounter]);

  useEffect(() => {
    if (selectedPlayer === SelectedPlayer.SecondPlayer && gameMode !== GameMode.PlayerVsPlayer) {
      let move = getRandomInInterval(0, 2);

      if (gameMode === GameMode.PlayerVsSmartComputer) {
        const secondPlayerLastMove = getLastElementOfArray(secondPlayerMoves);
        while (move === secondPlayerLastMove) {
          move = getRandomInInterval(0, 2);
        }
      }

      setTimeout(() => {
        onSecondPlayerMoveChange(move)
      }, 1000)
    }
  }, [gameMode, selectedPlayer, secondPlayerMoves, onSecondPlayerMoveChange])


  const onPlayerSelectorClick = (): void => {
    const currentPlayer =
      getRandomInInterval(1, 2) === 1 ? SelectedPlayer.FirstPlayer : SelectedPlayer.SecondPlayer;
    setSelectedPlayer(currentPlayer);
  }

  const alertMessage = () => {
    alert(`It's your oponent turn`);
  }

  const onFirstPlayerMoveChange = (action: Action) => {
    if (selectedPlayer === SelectedPlayer.FirstPlayer) {
      setSelectedPlayer(SelectedPlayer.SecondPlayer);
      setFirstPlayerMoves(prevMoves => [...prevMoves, action]);
    } else {
      if (gameMode === GameMode.PlayerVsPlayer) {
        alertMessage()
      }
    }
  }

  const onPlayAgainClick = () => {
    setGameMode(GameMode.None)
    setSelectedPlayer(SelectedPlayer.None);
    setFirstPlayerMoves([])
    setSecondPlayerMoves([])
    setGameResult('');
    setFirstPlayerWinsCounter(0);
    setSecondPlayerWinsCounter(0);
  }

  return (
    <div className="App">
      <div className='container'>
        {gameMode === GameMode.None ? <GameModeSelector onGameModeSelection={setGameMode} /> : (
          <div>
            {selectedPlayer !== SelectedPlayer.None ? (
              <Game
                gameMode={gameMode}
                gameResult={gameResult}
                selectedPlayer={selectedPlayer}
                onPlayAgainClick={onPlayAgainClick}
                onFirstPlayerMoveChange={onFirstPlayerMoveChange}
                onSecondPlayerMoveChange={onSecondPlayerMoveChange}
              />
            ) : (
              <PlayerSelector onPlayerSelectorClick={onPlayerSelectorClick} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
