import React, { useContext } from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import PokemonDetailsBtn from './PokemonDetailsBtn';
import { FetchedDataTableContext } from '../../../cotexts/FetchedDataTableProvider';

const MainDataListTableRow = ({
  isActive, hotKey, index, url, name, handlers, callbacks
}) => {
  const { state } = useContext(FetchedDataTableContext);

  const {
    mouseDownEventHandler, dragEnterHandler,
    mouseUpEventHandler, onClickHandler,
  } = handlers;
  const {
    mouseDownPressed, insertingElIndex, activeElIndex
  } = state;

  const className = cn({
    'border border-2 border-danger': isActive,
    'border border-2 border-info': (insertingElIndex === index) && mouseDownPressed,
    'bg-danger': (mouseDownPressed && isActive)
  });
  return (
    <tr
      className={className}
      draggable
      onDragEnter={() => {
        if (activeElIndex === -1) return;
        dragEnterHandler(index);
      }}
      onDragEnd={() => {
        if (!isActive) return;
        mouseUpEventHandler(index);
      }}
      onClick={() => {
        onClickHandler(index, hotKey);
      }}
      onMouseDown={() => {
        if (!isActive) return;
        mouseDownEventHandler(index);
      }}
      onMouseUp={() => {
        if (!isActive) return;
        mouseUpEventHandler();
      }}
    >
      <td>{name}</td>
      <td colSpan="1">
        <PokemonDetailsBtn
          callbacks={callbacks}
          url={url}
        />
      </td>
    </tr>
  );
};
MainDataListTableRow.propTypes = {
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  hotKey: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  handlers: PropTypes.shape({
    pageChangeHandler: PropTypes.func.isRequired,
    onClickHandler: PropTypes.func.isRequired,
    keyPressHandler: PropTypes.func.isRequired,
    dragEnterHandler: PropTypes.func.isRequired,
    mouseDownEventHandler: PropTypes.func.isRequired,
    mouseUpEventHandler: PropTypes.func.isRequired,
  }).isRequired,
  callbacks: PropTypes.shape({
    nameCapitalize: PropTypes.func.isRequired,
    getPokemonDetailsRequest: PropTypes.func.isRequired,
  }).isRequired,
};

export default MainDataListTableRow;
