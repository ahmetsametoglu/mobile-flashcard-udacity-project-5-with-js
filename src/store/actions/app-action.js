const showLoading = (dispatch, loadingText) => {
  // console.log('[App Action]: showLoading');
  dispatch({
    type: 'ShowLoading',
    payload: {loadingText: loadingText},
  });
};

const hideLoading = dispatch => {
  // console.log('[App Action]: hideLoading');
  dispatch({
    type: 'HideLoading',
  });
};

export const AppAction = {
  showLoading,
  hideLoading,
};
