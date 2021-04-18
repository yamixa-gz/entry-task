import React from 'react';
import cn from 'classnames';
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

export default MainDataListTableRow;
