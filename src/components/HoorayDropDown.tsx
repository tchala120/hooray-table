import React, { FC } from 'react'
import { Dropdown, Menu } from 'antd'

import FontAwesomeIcon from './FontAwesomeIcon'

import type { ActionButton, ActionMenuInfo } from '.'

export interface HoorayDropDownProps {
  menuList: ActionButton[]
  onDropDownMenuClick?: (value: ActionMenuInfo) => void
}


const HoorayDropDown: FC<HoorayDropDownProps> = ({ menuList, onDropDownMenuClick }) => {
  const primaryMenu = menuList.find((item) => item.type === 'primary') as ActionButton
  const existingMenuList = menuList.filter((item) => item.type !== 'primary')

  const menu = (
    <Menu onClick={onDropDownMenuClick}>
      {existingMenuList.map((item) => (
        <Menu.Item key={item.key} icon={item.icon ? <FontAwesomeIcon iconName={item.icon} /> : undefined}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  )

  return (
    <Dropdown.Button type="primary" onClick={primaryMenu?.onClick} overlay={menu} trigger={['click']}>
      {primaryMenu?.label}
    </Dropdown.Button>
  )
}

export default HoorayDropDown
