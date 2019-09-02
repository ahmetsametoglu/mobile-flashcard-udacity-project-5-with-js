import {API} from '../../utils/api';

const fetchDeckList = async dispatch => {
  // console.log('[Deck Action]: fetchDeckList');
  const deckList = await API.getDeckList();

  dispatch({
    type: 'FetchDeckList',
    payload: {deckList: [...deckList]},
  });
};

const addDeck = async (dispatch, deckTitle) => {
  // console.log('[Deck Action]: addDeck');

  const newDeck = await API.addDeck(deckTitle);
  console.log('newDeck:', newDeck);
  dispatch({
    type: 'AddDeckToList',
    payload: {newDeck: newDeck},
  });

  return {newDeck};
};

const removeDeck = async (dispatch, id) => {
  // console.log('[Deck Action]: removeDeck');

  const isProcessSuccess = await API.removeDeck(id);

  if (isProcessSuccess)
    dispatch({
      type: 'RemoveDeck',
      payload: {removeDeckId: id},
    });
};

const addCard = async (dispatch, deckId, question, answer) => {
  // console.log('[Deck Action]: addCard');

  const newCard = await API.addCard(deckId, question, answer);
  console.log('new card adding...');

  dispatch({
    type: 'AddCardToDeck',
    payload: {newCard: newCard, currentDeckId: deckId},
  });
};

export const DeckAction = {
  fetchDeckList,
  addDeck,
  removeDeck,
  addCard,
};
