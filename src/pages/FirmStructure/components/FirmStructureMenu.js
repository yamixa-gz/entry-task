import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import withTranslation from '../../../HOC/withTranslation';
import { BRANCHES } from '../../../constants/firmStructureElements';
import { FirmStructureContext } from '../../../cotexts/FirmStructureProvider';

const FirmStructureMenu = ({ getTranslation = () => null, handlers }) => {
  const {
    state,
    firmStruct,
  } = useContext(FirmStructureContext);

  const {
    branchesIndex,
    subBranchesIndex,
    categoryName,
  } = state;

  const { onMenuItemSelectHandler } = handlers;

  const defaultAppTranslation = {
    branches: 'Branches',
    subBranches: 'SubBranches',
    directors: 'Directors',
  };
  const appTranslation = getTranslation() || defaultAppTranslation;
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
        title={appTranslation[categoryName] || 'Category'}
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
          ? firmStruct.branches[branchesIndex].title : appTranslation.branches}
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
          : appTranslation.subBranches}
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
  getTranslation: PropTypes.func.isRequired,
  handlers: PropTypes.shape({
    sortClickHandler: PropTypes.func.isRequired,
    onMenuItemSelectHandler: PropTypes.func.isRequired,
    removeDataFromFirmStructHandler: PropTypes.func.isRequired,
    onClickTableRowHandler: PropTypes.func.isRequired,
  }).isRequired,
};

export default withTranslation(FirmStructureMenu);
