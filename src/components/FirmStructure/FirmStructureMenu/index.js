import {ButtonGroup, Dropdown, DropdownButton} from 'react-bootstrap'
import React, {Component} from 'react'

class FirmStructureMenu extends Component {

  render() {
    const {
      isCategoryDisabled, isBranchesDisabled, isSubBranchesDisabled, firmStruct,
      onMenuItemSelectHandler, branchesIndex, subBranchesIndex, categoryName
    } = this.props
    return <div className='d-grid gap-2 d-md-block'>
      <DropdownButton
          disabled={isCategoryDisabled}
          className={'m-1 ms-0 me-2'}
          as={ButtonGroup}
          id={`dropdown-variants-primary`}
          variant={'primary'}
          title={categoryName ? categoryName : 'Category'}
      >
        {!isCategoryDisabled
        && Object.keys(firmStruct).map(
            (key, i) =>
                <Dropdown.Item
                    onSelect={onMenuItemSelectHandler}
                    key={key}
                    eventKey={`categoryName-*-${i}-*-${key}`}
                    active={key === categoryName}
                >{key}</Dropdown.Item>
        )}
      </DropdownButton>

      <DropdownButton
          disabled={isBranchesDisabled}
          className={'m-1 ms-0 me-2'}
          as={ButtonGroup}
          id={`dropdown-variants-primary`}
          variant={'primary'}
          title={branchesIndex >= 0
              ? firmStruct.branches[branchesIndex].title : 'Branches'}
      >
        {!isBranchesDisabled
        && firmStruct.branches.map((item, i) =>
            <Dropdown.Item
                onSelect={onMenuItemSelectHandler}
                key={item.id}
                eventKey={`branches-*-${i}`}
                active={branchesIndex === i}
            >{item.title}</Dropdown.Item>
        )}
      </DropdownButton>

      <DropdownButton
          disabled={isSubBranchesDisabled}
          className={'m-1 ms-0 me-2'}
          as={ButtonGroup}
          id={`dropdown-variants-primary`}
          variant={'primary'}
          title={subBranchesIndex >= 0
              ? firmStruct.branches[branchesIndex].subBranches[subBranchesIndex].title
              : 'Subbranches'}
      >
        {!isSubBranchesDisabled
        && firmStruct.branches[branchesIndex].subBranches.map((item, i) =>
            <Dropdown.Item
                onSelect={onMenuItemSelectHandler}
                key={item.id}
                eventKey={`subBranches-*-${i}`}
                active={subBranchesIndex === i}
            >{item.title}</Dropdown.Item>
        )}
      </DropdownButton>
    </div>
  }
}

export default FirmStructureMenu

