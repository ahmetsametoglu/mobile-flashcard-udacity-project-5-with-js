import React, {createContext, useContext, useEffect} from 'react';
import {getRootReducer} from './root-reducer';
import {DeckAction} from './actions/deck-action';

export const Context = createContext();
export const useStoreContextValue = () => useContext(Context);

const StoreContextProvider = props => {
  const [state, dispatch] = getRootReducer();

  useEffect(() => {
    console.log('[StoreContextProvider]: useEffect fetchDeckList');
    DeckAction.fetchDeckList(dispatch);
  }, []);

  return <Context.Provider value={{state, dispatch}}>{props.children}</Context.Provider>;
};

export default StoreContextProvider;
