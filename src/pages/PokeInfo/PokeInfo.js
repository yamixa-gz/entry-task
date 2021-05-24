import React, { useEffect } from 'react';
import cloneDeep from 'lodash.clonedeep';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PokeInfoView from './PokeInfoView';
import {
  setActivePage,
  setDataFromMouseDownEvent,
  setDataFromMouseUpEvent,
  setActiveIndex,
  setInsertingElIndex,
  getPage,
} from '../../store/pokeInfo/actions';
import { END_OF_NEXT_PAGE } from '../../constants/pokeInfoElements';

const PokeInfo = ({
  state,
  getPageAction,
  setActiveIndexAction,
  setInsertingElIndexAction,
  setDataFromMouseDownEventAction,
  setDataFromMouseUpEventAction,
  setActivePageAction,
}) => {
  const nameCapitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const pokeInfoScrollHandler = () => {
    const { isPending, activePage, nextPage } = state;
    if (isPending) return;
    if ((document.documentElement.offsetHeight + 160)
      + document.documentElement.scrollTop >= document.documentElement.scrollHeight) {
      if (nextPage !== END_OF_NEXT_PAGE) setActivePageAction(activePage + 1);
    }
  };

  const onClickHandler = (index) => setActiveIndexAction(index);

  const dragEnterHandler = (index) => setInsertingElIndexAction(index);

  const mouseDownEventHandler = (index) => {
    const { fetchedDataArr } = state;
    const newFetchedDataArr = fetchedDataArr.filter((_, i) => i !== index);
    const movingElement = { ...fetchedDataArr[index] };
    setDataFromMouseDownEventAction(newFetchedDataArr, movingElement, index);
  };

  const mouseUpEventHandler = () => {
    const { newFetchedDataArr, movingElement, insertingElIndex } = state;
    const sortedFetchedDataArr = cloneDeep(newFetchedDataArr);

    sortedFetchedDataArr.splice(insertingElIndex, 0, { ...movingElement });
    setDataFromMouseUpEventAction(sortedFetchedDataArr);
  };
  const handlers = {
    onClickHandler,
    dragEnterHandler,
    mouseDownEventHandler,
    mouseUpEventHandler,
  };
  const callbacks = {
    nameCapitalize,
  };

  const {
    activePage, isPending, pageLimit, nextPage
  } = state;
  useEffect(() => {
    if (!isPending) getPageAction(activePage, pageLimit, nextPage);
  }, [activePage]);

  useEffect(() => {
    window.addEventListener('scroll', pokeInfoScrollHandler);
    return () => {
      window.removeEventListener('scroll', pokeInfoScrollHandler);
    };
  });
  return (
    <PokeInfoView
      handlers={handlers}
      callbacks={callbacks}
    />
  );
};

PokeInfo.propTypes = {
  state: PropTypes.shape({
    isPending: PropTypes.bool.isRequired,
    fetchedDataArr: PropTypes.arrayOf(PropTypes.object),
    pageLimit: PropTypes.number.isRequired,
    pageNumber: PropTypes.number.isRequired,
    activePage: PropTypes.number.isRequired,
    newFetchedDataArr: PropTypes.arrayOf(PropTypes.object),
    movingElement: PropTypes.objectOf(PropTypes.any).isRequired,
    insertingElIndex: PropTypes.number.isRequired,
    nextPage: PropTypes.string.isRequired,
  }).isRequired,
  getPageAction: PropTypes.func.isRequired,
  setActiveIndexAction: PropTypes.func.isRequired,
  setInsertingElIndexAction: PropTypes.func.isRequired,
  setDataFromMouseDownEventAction: PropTypes.func.isRequired,
  setDataFromMouseUpEventAction: PropTypes.func.isRequired,
  setActivePageAction: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  state: {
    isPending: state.pokeInfo.isPending,
    fetchedDataArr: state.pokeInfo.fetchedDataArr,
    pageLimit: state.pokeInfo.pageLimit,
    pageNumber: state.pokeInfo.pageLimit,
    activePage: state.pokeInfo.activePage,
    newFetchedDataArr: state.pokeInfo.newFetchedDataArr,
    movingElement: state.pokeInfo.movingElement,
    insertingElIndex: state.pokeInfo.insertingElIndex,
    nextPage: state.pokeInfo.nextPage,
  },
});

const mapDispatchToProps = {
  getPageAction: getPage,
  setActiveIndexAction: setActiveIndex,
  setInsertingElIndexAction: setInsertingElIndex,
  setDataFromMouseDownEventAction: setDataFromMouseDownEvent,
  setDataFromMouseUpEventAction: setDataFromMouseUpEvent,
  setActivePageAction: setActivePage,
};

export default connect(mapStateToProps, mapDispatchToProps)(PokeInfo);
