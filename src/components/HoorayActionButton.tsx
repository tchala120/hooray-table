import React, { FC } from 'react'
import { Button, Space } from 'antd'

import FontAwesomeIcon from './FontAwesomeIcon'
import HoorayDropDown from './HoorayDropDown'

import { ActionButton, ActionMenuInfo } from '..'

export interface HoorayActionButtonProps {
  menuList: ActionButton[]
  buttonDisplayLimit?: number
  onDropDownMenuClick?: (value: ActionMenuInfo) => void
}

const HoorayActionButton: FC<HoorayActionButtonProps> = ({
  menuList,
  buttonDisplayLimit = 5,
  onDropDownMenuClick,
}) => {
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

  return <HoorayDropDown menuList={menuList} onDropDownMenuClick={onDropDownMenuClick} />
}

export default HoorayActionButton
