import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { BRANCHES } from '../../../constants/firmStructureElements';

const FirmStructureMenu = ({
  handlers, branchesIndex, subBranchesIndex, categoryName, firmStruct, 
}) => {
  const { onMenuItemSelectHandler } = handlers;
  const { t } = useTranslation('FirmStructure');

  const isCategoryDisabled = !categoryName;
  const isBranchesDisabled = !(firmStruct.branches.length > 0
    && (categoryName === BRANCHES));
  const isSubBranchesDisabled = !(firmStruct.branches[branchesIndex]?.subBranches?.length > 0
    && categoryName === BRANCHES);

  return (
    <div className="d-grid gap-2 d-md-block">
      <DropdownButton
        disabled={isCategoryDisabled}
        className="m-1 ms-0 me-2"
        as={ButtonGroup}
        id="dropdown-variants-primary"
        variant="primary"
        title={t(categoryName)}
      >
        {!isCategoryDisabled
          && Object.keys(firmStruct).map(
            (key, i) => (
              <Dropdown.Item
                onSelect={onMenuItemSelectHandler}
                key={key}
                eventKey={`categoryName-*-${i}-*-${key}`}
                active={key === categoryName}
              >
                {key}
              </Dropdown.Item>
            )
          )}
      </DropdownButton>

      <DropdownButton
        disabled={isBranchesDisabled}
        className="m-1 ms-0 me-2"
        as={ButtonGroup}
        id="dropdown-variants-primary"
        variant="primary"
        title={branchesIndex >= 0
          ? firmStruct.branches[branchesIndex].title : t('branches')}
      >
        {!isBranchesDisabled
          && firmStruct.branches.map((item, i) => (
            <Dropdown.Item
              onSelect={onMenuItemSelectHandler}
              key={item.id}
              eventKey={`branches-*-${i}`}
              active={branchesIndex === i}
            >
              {item.title}
            </Dropdown.Item>
          ))}
      </DropdownButton>

      <DropdownButton
        disabled={isSubBranchesDisabled}
        className="m-1 ms-0 me-2"
        as={ButtonGroup}
        id="dropdown-variants-primary"
        variant="primary"
        title={subBranchesIndex >= 0
          ? firmStruct.branches[branchesIndex].subBranches[subBranchesIndex].title
          : t('subBranches')}
      >
        {!isSubBranchesDisabled
          && firmStruct.branches[branchesIndex].subBranches.map((item, i) => (
            <Dropdown.Item
              onSelect={onMenuItemSelectHandler}
              key={item.id}
              eventKey={`subBranches-*-${i}`}
              active={subBranchesIndex === i}
            >
              {item.title}
            </Dropdown.Item>
          ))}
      </DropdownButton>
    </div>
  );
};
FirmStructureMenu.propTypes = {
  handlers: PropTypes.shape({
    sortClickHandler: PropTypes.func.isRequired,
    onMenuItemSelectHandler: PropTypes.func.isRequired,
    removeDataFromFirmStructHandler: PropTypes.func.isRequired,
    onClickTableRowHandler: PropTypes.func.isRequired,
  }).isRequired,
  categoryName: PropTypes.string.isRequired,
  branchesIndex: PropTypes.number.isRequired,
  subBranchesIndex: PropTypes.number.isRequired,
  firmStruct: PropTypes.shape({
    branches: PropTypes.arrayOf(PropTypes.object).isRequired,
    directors: PropTypes.objectOf(PropTypes.object).isRequired,
  }).isRequired,
};
const mapStateToProps = (state) => ({
  branchesIndex: state.firmStructure.branchesIndex,
  subBranchesIndex: state.firmStructure.subBranchesIndex,
  categoryName: state.firmStructure.categoryName,
  firmStruct: state.firmStructure.firmStruct,
});

export default connect(mapStateToProps)(FirmStructureMenu);
