import {ActionType} from '../action-type';

export const initialDecksState = {deckList: []};

export const decksReducer = (state = initialDecksState, action) => {
  switch (action.type) {
    case ActionType.FetchDeckList:
      logActionType(action);
      const deckList = action.payload.deckList;
      if (!!deckList) {
        return {...state, deckList};
      } else {
        return {...state};
      }

    case ActionType.AddDeckToList:
      logActionType(action);
      const newDeck = action.payload.newDeck;
      return !newDeck ? {...state} : {...state, deckList: [...state.deckList, newDeck]};

    case ActionType.RemoveDeck:
      logActionType(action);
      const removeDeckId = action.payload.removeDeckId;
      const removeDeckIndex = state.deckList.findIndex(d => d._id === removeDeckId);

      if (removeDeckIndex !== -1) {
        const {deckList} = state;
        deckList.splice(removeDeckIndex, 1);
        return {...state, deckList: [...deckList]};
      } else {
        return {...state};
      }

    case ActionType.AddCardToDeck:
      logActionType(action);
      const currentDeckId = action.payload.currentDeckId;
      const newCard = action.payload.newCard;
      if (!!newCard) {
        const {deckList} = state;
        const deckIndex = deckList.findIndex(d => d._id === currentDeckId);
        deckList[deckIndex].cards.push(newCard);
        return {...state, deckList: [...deckList]};
      } else {
        return {...state};
      }

    default:
      return {...state};
  }
};

const logActionType = action => {
  console.log(`[Decks Reducer]: ${action.type}`);
};
