import React from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BRANCHES_STYLE, EMPLOYEES_STYLE } from '../../../constants/firmStructureElements';
import BranchesTableRow from './BranchesTableRow';
import EmployeesTableRow from './EmployeesTableRow';
import BranchesTableHeader from './BranchesTableHeader';
import EmployeesTableHeader from './EmployeesTableHeader';

const FirmStructureTable = ({
  handlers, callbacks, showingFirmStructSection, tableStyle, itemsIdForDelete
}) => {
  const { sortClickHandler, onClickTableRowHandler } = handlers;
  const { setColumnStyle } = callbacks;

  return (
    <Table striped bordered hover>
      <thead>
        {tableStyle === BRANCHES_STYLE && (
          <BranchesTableHeader
            setColumnStyle={setColumnStyle}
            sortClickHandler={sortClickHandler}
          />
        )}
        {tableStyle === EMPLOYEES_STYLE && (
        <EmployeesTableHeader
          setColumnStyle={setColumnStyle}
          sortClickHandler={sortClickHandler}
        />
        )}
      </thead>
      <tbody>
        {tableStyle === BRANCHES_STYLE
          && showingFirmStructSection.map((item, i) => (
            <BranchesTableRow
              id={item.id}
              key={item.id}
              num={i + 1}
              text={item.title}
              onClickTableRowHandler={onClickTableRowHandler}
              itemsIdForDelete={itemsIdForDelete}
            />
          ))}
        {tableStyle === EMPLOYEES_STYLE
            && showingFirmStructSection.map((item, i) => (
              <EmployeesTableRow
                key={item.id}
                id={item.id}
                num={i + 1}
                name={item.name}
                surname={item.surname}
                salary={item.salary}
                job={item.job}
                onClickTableRowHandler={onClickTableRowHandler}
                itemsIdForDelete={itemsIdForDelete}
              />
            ))}
      </tbody>
    </Table>
  );
};
FirmStructureTable.propTypes = {
  handlers: PropTypes.shape({
    sortClickHandler: PropTypes.func.isRequired,
    onMenuItemSelectHandler: PropTypes.func.isRequired,
    removeDataFromFirmStructHandler: PropTypes.func.isRequired,
    onClickTableRowHandler: PropTypes.func.isRequired,
  }).isRequired,
  callbacks: PropTypes.shape({
    setColumnStyle: PropTypes.func.isRequired,
    addDataFromFormToFirmStruct: PropTypes.func.isRequired,
  }).isRequired,
  showingFirmStructSection: PropTypes.arrayOf(PropTypes.object).isRequired,
  tableStyle: PropTypes.string.isRequired,
  itemsIdForDelete: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  tableStyle: state.firmStructure.tableStyle,
  itemsIdForDelete: state.firmStructure.itemsIdForDelete,
});

export default connect(mapStateToProps)(FirmStructureTable);
