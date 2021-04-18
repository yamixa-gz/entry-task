import React from 'react';

const BranchesTableRow = ({
  id, num, text, onClickTableRowHandler, itemsIdForDelete 
}) => {
  return (
    <tr
      onClick={() => onClickTableRowHandler(id)}
      className={itemsIdForDelete?.includes(id) ? 'bg-danger' : ''}
    >
      <td>{num}</td>
      <td colSpan="1">{text}</td>
    </tr>
  );
};

export default BranchesTableRow;
