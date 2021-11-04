import { Action } from "../model/Action";

export const movesComparator = (firstMove: Action, secondMove: Action) => {
  if (firstMove === secondMove) {
    return 0;
  }

  if ((firstMove === Action.Rock && secondMove === Action.Paper) ||
    (firstMove === Action.Scissors && secondMove === Action.Rock) ||
    (firstMove === Action.Paper && secondMove === Action.Scissors)) {
    return -1;
  }

  return 1;
};
