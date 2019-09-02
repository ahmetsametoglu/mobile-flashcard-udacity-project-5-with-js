import {ActionType} from '../action-type';

export const initialAppState = {
  showLoading: false,
  loadingText: null,
};

export const appReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case ActionType.ShowLoading:
      console.log(`[App Reducer]: ${action.type}`);
      return {
        ...state,
        showLoading: true,
        loadingText: action.payload.loadingText,
      };

    case ActionType.HideLoading:
      console.log(`[App Reducer]: ${action.type}`);
      return {...state, showLoading: false, loadingText: null};

    default:
      return {...state};
  }
};
