import { GameMode } from "../model/GameMode";

export const getSecondPlayerName = (gameMode: GameMode): string => {
    switch (gameMode) {
        case GameMode.PlayerVsComputer: return 'Dumb Computer';
        case GameMode.PlayerVsSmartComputer: return 'Computer';
        case GameMode.PlayerVsPlayer:
        default: return 'Player 2';
    }
};
