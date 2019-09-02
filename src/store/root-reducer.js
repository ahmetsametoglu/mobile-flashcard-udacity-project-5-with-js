import {useReducer} from 'react';
import {appReducer, initialAppState} from './reducers/app-reducer';
import {decksReducer, initialDecksState} from './reducers/deck-reducer';

const combineReducers = reducer => {
  return (state = {}, action) => {
    const keys = Object.keys(reducer);

    const nextReducers = {};
    for (let i = 0; i < keys.length; i++) {
      const invoke = reducer[keys[i]](state[keys[i]], action);
      nextReducers[keys[i]] = invoke;
    }
    return nextReducers;
  };
};

export const rootReducer = combineReducers({
  app: appReducer,
  deck: decksReducer,
});

export const rootInitState = {
  app: initialAppState,
  deck: initialDecksState,
};

export const getRootReducer = () => {
  return useReducer(rootReducer, rootInitState);
};
