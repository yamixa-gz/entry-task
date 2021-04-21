import React from 'react';
import PropTypes from 'prop-types';

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
BranchesTableRow.propTypes = {
  id: PropTypes.string.isRequired,
  num: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  onClickTableRowHandler: PropTypes.func.isRequired,
  itemsIdForDelete: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default BranchesTableRow;
