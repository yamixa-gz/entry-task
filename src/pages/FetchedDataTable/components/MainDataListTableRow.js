import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import PokemonDetailsBtn from './PokemonDetailsBtn';

const MainDataListTableRow = ({
  index, isActive, name, mouseDownEventHandler, dragEnterHandler,
  mouseUpEventHandler, onClickHandler, hotKey, activeElIndex, url,
  getPokemonDetailsRequest, isPending, pokemonDetails, insertingElIndex,
  mouseDownPressed
}) => {
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
          getPokemonDetailsRequest={getPokemonDetailsRequest}
          url={url}
          isPending={isPending}
          pokemonDetails={pokemonDetails}
        />
      </td>
    </tr>
  );
};
MainDataListTableRow.propTypes = {
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  mouseDownEventHandler: PropTypes.func.isRequired,
  dragEnterHandler: PropTypes.func.isRequired,
  mouseUpEventHandler: PropTypes.func.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  hotKey: PropTypes.string.isRequired,
  activeElIndex: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  getPokemonDetailsRequest: PropTypes.func.isRequired,
  isPending: PropTypes.bool.isRequired,
  insertingElIndex: PropTypes.number.isRequired,
  mouseDownPressed: PropTypes.bool.isRequired,
  pokemonDetails: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    abilities: PropTypes.arrayOf(PropTypes.string),
  }),
};

MainDataListTableRow.defaultProps = {
  pokemonDetails: {
    id: 0,
    name: '',
    avatarUrl: '',
    abilities: [],
  }
};

export default MainDataListTableRow;
