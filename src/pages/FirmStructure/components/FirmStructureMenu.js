import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import React from 'react';
import PropTypes from 'prop-types';
import withTranslation from '../../../HOC/withTranslation';

const FirmStructureMenu = ({
  isCategoryDisabled, isBranchesDisabled, isSubBranchesDisabled, firmStruct,
  onMenuItemSelectHandler, branchesIndex, subBranchesIndex, categoryName, appLanguage
}) => {
  return (
    <div className="d-grid gap-2 d-md-block">
      <DropdownButton
        disabled={isCategoryDisabled}
        className="m-1 ms-0 me-2"
        as={ButtonGroup}
        id="dropdown-variants-primary"
        variant="primary"
        title={categoryName ? Object.entries(appLanguage).find((entry) => entry[0] === categoryName)[1] : 'Category'}
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
          ? firmStruct.branches[branchesIndex].title : appLanguage.branches}
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
          : appLanguage.subBranches}
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
  appLanguage: PropTypes.shape({
    branches: PropTypes.string,
    subBranches: PropTypes.string,
    directors: PropTypes.string,
  }),
  isCategoryDisabled: PropTypes.bool.isRequired,
  isBranchesDisabled: PropTypes.bool.isRequired,
  isSubBranchesDisabled: PropTypes.bool.isRequired,
  firmStruct: PropTypes.object.isRequired,
  onMenuItemSelectHandler: PropTypes.func.isRequired,
  branchesIndex: PropTypes.number.isRequired,
  subBranchesIndex: PropTypes.number.isRequired,
  categoryName: PropTypes.string.isRequired,
};
FirmStructureMenu.defaultProps = {
  appLanguage: {
    branches: 'Branches',
    subBranches: 'SubBranches',
    directors: 'Directors',
  },
};

export default withTranslation(FirmStructureMenu);
