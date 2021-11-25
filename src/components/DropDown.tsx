import React, { FC } from 'react'
import { Dropdown as AntdDropDown, Menu } from 'antd'

import FontAwesomeIcon from './FontAwesomeIcon'

import type { ActionButtonInfo, ActionMenuInfo } from '.'

export interface DropDownProps {
  menuList: ActionButtonInfo[]
  onDropDownMenuClick?: (value: ActionMenuInfo) => void
}


const DropDown: FC<DropDownProps> = ({ menuList, onDropDownMenuClick }) => {
  const primaryMenu = menuList.find((item) => item.type === 'primary') as ActionButtonInfo
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
    <AntdDropDown.Button type="primary" onClick={primaryMenu?.onClick} overlay={menu} trigger={['click']}>
      {primaryMenu?.label}
    </AntdDropDown.Button>
  )
}

export default DropDown
