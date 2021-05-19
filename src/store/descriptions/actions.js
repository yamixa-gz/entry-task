import SET_OPEN_CARD_ID from './types';

const setOpenCardIdActionCreator = (openCardId) => (dispatch) => dispatch({
  type: SET_OPEN_CARD_ID,
  openCardId,
});

export default setOpenCardIdActionCreator;
