import React from 'react';
import PropTypes from 'prop-types';

const EmployeesTableRow = ({
  id, num, job, name, surname, salary, onClickTableRowHandler, itemsIdForDelete
}) => {
  return (
    <tr
      onClick={() => onClickTableRowHandler(id)}
      className={itemsIdForDelete?.includes(id) ? 'bg-danger' : ''}
    >
      <td>{num}</td>
      <td>{job}</td>
      <td>{name}</td>
      <td>{surname}</td>
      <td>{salary}</td>
    </tr>
  );
};
EmployeesTableRow.propTypes = {
  id: PropTypes.string.isRequired,
  num: PropTypes.number.isRequired,
  job: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
  salary: PropTypes.number.isRequired,
  onClickTableRowHandler: PropTypes.func.isRequired,
  itemsIdForDelete: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default EmployeesTableRow;
