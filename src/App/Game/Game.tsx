import { Action } from "../../model/Action";
import { GameMode } from "../../model/GameMode";
import { SelectedPlayer } from "../../model/SelectedPlayer";
import { getSecondPlayerName } from "../../services/getSecondPlayerName";
import { GamePlayer } from "../GamePlayer/GamePlayer";
import { AiOutlineRedo } from "react-icons/ai";

interface IGameProps {
    gameMode: GameMode;
    gameResult: string;
    selectedPlayer: number,
    onFirstPlayerMoveChange(move: Action): void,
    onSecondPlayerMoveChange(move: Action): void
    onPlayAgainClick(): void;
}

export const Game = ({ gameMode, gameResult, onPlayAgainClick, selectedPlayer, onFirstPlayerMoveChange, onSecondPlayerMoveChange }: IGameProps) => {
    if (gameResult) {
        return (
            <div className='row' style={{ paddingTop: '40vh' }}>
                <div className='col-12'>
                    <div className='bg-gray text-center'>
                        <h1 className='text-success'>
                            {gameResult}
                            <br />
                            <button
                                onClick={onPlayAgainClick}
                                style={{ marginLeft: 15 }}
                                className='btn btn-lg btn-outline-dark rounded-0 mt-4'
                            >
                                <AiOutlineRedo size={30} />
                                Play Again
                            </button>
                        </h1>
                    </div>
                </div>
            </div>
        )
    }

    const isFirstPlayer = selectedPlayer === SelectedPlayer.FirstPlayer;

    return (
        <div className='row' style={{ paddingTop: '25vh' }}>
            <div className={`col-5${isFirstPlayer ? ' border border-3 rounded border-primary' : ''}`}>
                <GamePlayer
                    playerName='Player 1'
                    onPlayerMoveChange={onFirstPlayerMoveChange}
                />
            </div>
            <div className='col-2 text-center pb-5 pt-5'>
                <h1 className='pt-5' style={{ fontFamily: 'serif' }}>
                    VS
                </h1>
            </div>
            <div className={`col-5${isFirstPlayer ? '' : ' border border-3 rounded border-warning'}`}>
                <GamePlayer
                    isComputerTurn={gameMode !== GameMode.PlayerVsPlayer && selectedPlayer === SelectedPlayer.SecondPlayer}
                    playerName={getSecondPlayerName(gameMode)}
                    onPlayerMoveChange={onSecondPlayerMoveChange}
                />
            </div>
            <div className='col-12 pt-5'>
                <h1 className='text-center'>
                    {!gameResult && (
                        <>
                            {isFirstPlayer ? 'First Player' : gameMode === GameMode.PlayerVsPlayer ? 'Second Player' : 'Computer'} Turn
                        </>
                    )}
                </h1>
            </div>
        </div>
    );
}