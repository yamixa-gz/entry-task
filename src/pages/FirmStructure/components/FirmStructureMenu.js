import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import withTranslation from '../../../HOC/withTranslation';
import withAppLanguageConsumer from '../../../HOC/withAppLanguageConsumer';

const FirmStructureMenu = ({
  isCategoryDisabled, isBranchesDisabled, isSubBranchesDisabled, firmStruct, getTranslation = () => null,
  onMenuItemSelectHandler, branchesIndex, subBranchesIndex, categoryName, appLanguage
}) => {
  const defaultAppTranslation = {
    branches: 'Branches',
    subBranches: 'SubBranches',
    directors: 'Directors',
  };
  const appTranslation = getTranslation(appLanguage) || defaultAppTranslation;
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
  appLanguage: PropTypes.string.isRequired,
  getTranslation: PropTypes.func.isRequired,
  isCategoryDisabled: PropTypes.bool.isRequired,
  isBranchesDisabled: PropTypes.bool.isRequired,
  isSubBranchesDisabled: PropTypes.bool.isRequired,
  onMenuItemSelectHandler: PropTypes.func.isRequired,
  branchesIndex: PropTypes.number.isRequired,
  subBranchesIndex: PropTypes.number.isRequired,
  categoryName: PropTypes.string.isRequired,
  firmStruct: PropTypes.shape({
    branches: PropTypes.arrayOf(PropTypes.object),
    directors: PropTypes.objectOf(PropTypes.object)
  }).isRequired
};

export default compose(
  withAppLanguageConsumer,
  withTranslation,
)(FirmStructureMenu);
