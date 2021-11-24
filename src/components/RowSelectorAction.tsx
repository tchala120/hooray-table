import React, { FC } from 'react'
import { Space } from 'antd'

import HoorayDropDown from './HoorayDropDown'

import { LocaleType, translation } from '../helpers/locale'

import type { ActionButton, ActionMenuInfo } from '..'

export interface RowSelectorActionProps {
  locale?: LocaleType
  hasSelected?: boolean
  selectedRowCount?: number
  menuList?: ActionButton[]
  onDropDownMenuClick?: (value: ActionMenuInfo) => void
}

const RowSelectorAction: FC<RowSelectorActionProps> = ({
  locale,
  hasSelected,
  selectedRowCount = 0,
  menuList = [],
  onDropDownMenuClick,
}) => {
  return (
    <Space>
      <HoorayDropDown menuList={menuList} onDropDownMenuClick={onDropDownMenuClick} />
      {hasSelected && (
        <span>
          {translation('selectedRow', locale)} {selectedRowCount}{' '}
          {translation('item', locale, {
            type: 'PLURAL',
            plural: selectedRowCount > 1,
          })}
        </span>
      )}
    </Space>
  )
}

export default RowSelectorAction
