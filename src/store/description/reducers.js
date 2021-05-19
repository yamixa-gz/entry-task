import SET_OPEN_CARD_ID from './types';

const initialState = {
  openCardId: '',
};

const description = (state = initialState, action) => {
  switch (action.type) {
    case SET_OPEN_CARD_ID:
      return {
        ...state,
        openCardId: action.openCardId === state.openCardId ? '' : action.openCardId,
      };
    default:
      return state;
  }
};

export default description;
