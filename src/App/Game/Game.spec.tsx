import { fireEvent, render } from "@testing-library/react"
import { Action } from "../../model/Action";
import { GameMode } from "../../model/GameMode";
import { SelectedPlayer } from "../../model/SelectedPlayer";
import { Game } from "./Game"

describe('Game Component', () => {
    it('should render Game component correctly', () => {
        const { container } = render(
            <Game
                gameResult={''}
                gameMode={GameMode.None}
                selectedPlayer={SelectedPlayer.None}
                onFirstPlayerMoveChange={jest.fn()}
                onSecondPlayerMoveChange={jest.fn()}
                onPlayAgainClick={jest.fn()}
            />
        );

        expect(container).toMatchSnapshot();
    })

    it('should render Game compnent with PlayerVsPlayer mode', () => {
        const { container, getByText } = render(
            <Game
                gameResult={''}
                gameMode={GameMode.PlayerVsPlayer}
                selectedPlayer={SelectedPlayer.SecondPlayer}
                onFirstPlayerMoveChange={jest.fn()}
                onSecondPlayerMoveChange={jest.fn()}
                onPlayAgainClick={jest.fn()}
            />
        );

        expect(container).toMatchSnapshot();
        expect(getByText('Second Player Turn')).toBeDefined();
    })

    it('should render Game compnent with PlayerVsComputer mode', () => {
        const { container, getByText } = render(
            <Game
                gameResult={''}
                gameMode={GameMode.PlayerVsComputer}
                selectedPlayer={SelectedPlayer.SecondPlayer}
                onFirstPlayerMoveChange={jest.fn()}
                onSecondPlayerMoveChange={jest.fn()}
                onPlayAgainClick={jest.fn()}
            />
        );

        expect(container).toMatchSnapshot();
        expect(getByText('Computer Turn')).toBeDefined();
    })

    it.each<[string, string]>([
        ['Scissors', 'svg[color="red"]'],
        ['Rock', 'svg[color="blue"]'],
        ['Paper', 'svg[color="lightgreen"]'],
    ])('should simulate first player move and expect %s to be selected', (action: string, selector: string,) => {
        const onFirstPlayerMoveChange = jest.fn();
        const { container } = render(
            <Game
                gameResult={''}
                gameMode={GameMode.PlayerVsComputer}
                selectedPlayer={SelectedPlayer.FirstPlayer}
                onFirstPlayerMoveChange={onFirstPlayerMoveChange}
                onSecondPlayerMoveChange={jest.fn()}
                onPlayAgainClick={jest.fn()}
            />
        );

        fireEvent.click(container.querySelector(selector) as HTMLElement)

        const expectedAction = action === 'Paper' ? Action.Paper : action === 'Rock' ? Action.Rock : Action.Scissors;

        expect(onFirstPlayerMoveChange).toHaveBeenCalledWith(expectedAction);
    })


    it('should simulate click on play again button', () => {
        const onPlayAgainClick = jest.fn();
        const { getByRole } = render(
            <Game
                gameResult={'Player one won'}
                gameMode={GameMode.PlayerVsComputer}
                selectedPlayer={SelectedPlayer.SecondPlayer}
                onFirstPlayerMoveChange={jest.fn()}
                onSecondPlayerMoveChange={jest.fn()}
                onPlayAgainClick={onPlayAgainClick}
            />
        );

        fireEvent.click(getByRole('button'));

        expect(onPlayAgainClick).toBeCalledTimes(1)
    })

});
