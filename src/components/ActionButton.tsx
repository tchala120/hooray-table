import React, { FC } from 'react'
import { Button, Space } from 'antd'

import FontAwesomeIcon from './FontAwesomeIcon'
import DropDown from './DropDown'

import { ActionButtonInfo, ActionMenuInfo } from '..'

export interface ActionButtonProps {
  menuList: ActionButtonInfo[]
  buttonDisplayLimit?: number
  onDropDownMenuClick?: (value: ActionMenuInfo) => void
}

const ActionButton: FC<ActionButtonProps> = ({ menuList, buttonDisplayLimit = 5, onDropDownMenuClick }) => {
  if (menuList.length < buttonDisplayLimit) {
    const sortMenuByButtonType = menuList.sort((a) => {
      if (a.type === 'primary') {
        return 1
      }

      return -1
    })

    return (
      <Space size="small">
        {sortMenuByButtonType.map(({ label, icon, ...props }) => (
          <Button {...props} icon={icon ? <FontAwesomeIcon iconName={icon} /> : undefined}>
            {label}
          </Button>
        ))}
      </Space>
    )
  }

  return <DropDown menuList={menuList} onDropDownMenuClick={onDropDownMenuClick} />
}

export default ActionButton
