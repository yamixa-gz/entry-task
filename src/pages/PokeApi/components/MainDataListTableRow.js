import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PokemonDetailsBtn from './PokemonDetailsBtn';

const MainDataListTableRow = ({
  isActive, index, url, name, handlers, callbacks, insertingElIndex, activeElIndex, mouseDownPressed,
}) => {
  const {
    mouseDownEventHandler, dragEnterHandler,
    mouseUpEventHandler, onClickHandler
  } = handlers;

  const className = cn({
    'border border-2 border-danger': isActive,
    'border border-2 border-info': (insertingElIndex === index) && mouseDownPressed,
    'bg-danger': (mouseDownPressed && isActive)
  });
  return (
    <tr
      className={className}
      draggable
      onDragEnter={() => (activeElIndex !== -1) && dragEnterHandler(index)}
      onDragEnd={() => isActive && mouseUpEventHandler(index)}
      onClick={() => onClickHandler(index)}
      onMouseDown={() => isActive && mouseDownEventHandler(index)}
      onMouseUp={() => isActive && mouseUpEventHandler()}
    >
      <td>{name}</td>
      <td colSpan="1">
        <PokemonDetailsBtn
          callbacks={callbacks}
          url={url}
          index={index}
        />
      </td>
    </tr>
  );
};
MainDataListTableRow.propTypes = {
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  mouseDownPressed: PropTypes.bool.isRequired,
  insertingElIndex: PropTypes.number.isRequired,
  activeElIndex: PropTypes.number.isRequired,
  handlers: PropTypes.shape({
    pageChangeHandler: PropTypes.func.isRequired,
    onClickHandler: PropTypes.func.isRequired,
    dragEnterHandler: PropTypes.func.isRequired,
    mouseDownEventHandler: PropTypes.func.isRequired,
    mouseUpEventHandler: PropTypes.func.isRequired,
  }).isRequired,
  callbacks: PropTypes.shape({
    nameCapitalize: PropTypes.func.isRequired,
    getPokemonDetailsRequest: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  mouseDownPressed: state.pokeApi.mouseDownPressed,
  insertingElIndex: state.pokeApi.insertingElIndex,
  activeElIndex: state.pokeApi.activeElIndex,
});

export default connect(mapStateToProps)(MainDataListTableRow);
