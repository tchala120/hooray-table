import React, { FC } from 'react'
import { Dropdown as AntdDropDown, Menu } from 'antd'

import FontAwesomeIcon from './FontAwesomeIcon'

import type { ActionButtonInfo, ActionMenuInfo, ButtonType } from '.'

export interface DropDownProps {
  type?: ButtonType
  menuList: ActionButtonInfo[]
  onDropDownMenuClick?: (value: ActionMenuInfo) => void
}


const DropDown: FC<DropDownProps> = ({ type, menuList, onDropDownMenuClick }) => {
  const existingMenuList = menuList.filter((item) => item.type !== 'primary')
  const primaryMenu = menuList.find((item) => item.type === 'primary') || existingMenuList[0]

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
    <AntdDropDown.Button type={type} onClick={primaryMenu?.onClick} overlay={menu} trigger={['click']}>
      {primaryMenu?.label}
    </AntdDropDown.Button>
  )
}

export default DropDown
