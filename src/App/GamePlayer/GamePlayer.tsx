import {
    GiRock,
    GiPaper,
    GiScissors
} from "react-icons/gi";
import { Action } from "../../model/Action";

interface IGamePlayerProps {
    playerName: string;
    isComputerTurn?: boolean;
    onPlayerMoveChange(action: Action): void;
}

export const GamePlayer = ({ playerName, isComputerTurn, onPlayerMoveChange }: IGamePlayerProps) => {
    return (
        <>
            <h1 className='text-center'>
                {isComputerTurn ? <span className='spinner-grow' /> : undefined}
                {playerName}
            </h1>
            <div className={`row text-center pt-4`}>
                <div className='col'>
                    <GiPaper
                        size={100}
                        color='lightgreen'
                        className='hovered'
                        style={{
                            transform: 'rotate(-90deg)',
                            border: '1px lightgreen solid',

                        }}
                        onClick={() => onPlayerMoveChange(Action.Paper)}
                    />
                </div>
                <div className='col'>
                    <GiRock
                        size={100}
                        color='blue'
                        className='hovered'
                        style={{
                            transform: 'rotate(-90deg)',
                            border: '1px blue solid',
                        }}
                        onClick={() => onPlayerMoveChange(Action.Rock)}
                    />
                </div>
                <div className='col'>
                    <GiScissors
                        size={100}
                        color='red'
                        className='hovered'
                        style={{
                            transform: 'rotate(-90deg)',
                            border: '1px red solid',
                        }}
                        onClick={() => onPlayerMoveChange(Action.Scissors)}
                    />
                </div>
            </div>
        </>
    );
};
