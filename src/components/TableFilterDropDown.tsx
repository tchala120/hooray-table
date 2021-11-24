import React, { FC, MutableRefObject } from 'react'
import { Button, Input, Space } from 'antd'

import FontAwesomeIcon from './FontAwesomeIcon'

import { LocaleType, translation } from '../helpers/locale'

import type { FilterConfirmProps } from 'antd/lib/table/interface'

export interface TableFilterDropDownProps {
  locale?: LocaleType
  searchInputRef: MutableRefObject<Input | null | undefined>
  selectedKeys: React.Key[]
  confirm: (param?: FilterConfirmProps | undefined) => void
  clearFilters?: (() => void) | undefined
  setSelectedKeys: (selectedKeys: React.Key[]) => void
}

const TableFilterDropDown: FC<TableFilterDropDownProps> = ({
  locale,
  searchInputRef,
  selectedKeys,
  confirm,
  clearFilters,
  setSelectedKeys,
}) => {
  return (
    <div style={{ padding: 8 }}>
      <Input
        ref={(node) => {
          searchInputRef.current = node
        }}
        placeholder={translation('filterDropDown.searchInputPlaceholder', locale)}
        value={selectedKeys[0]}
        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => confirm()}
        style={{ marginBottom: 8, display: 'block' }}
      />
      <Space size="small">
        <Button
          type="primary"
          onClick={() => confirm()}
          icon={<FontAwesomeIcon iconName="search" />}
          size="small"
          style={{ width: 90 }}
        >
          {translation('filterDropDown.searchButton', locale)}
        </Button>
        <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
          {translation('filterDropDown.resetButton', locale)}
        </Button>
        <Button type="link" size="small" onClick={() => confirm({ closeDropdown: false })}>
          {translation('filterDropDown.filterButton', locale)}
        </Button>
      </Space>
    </div>
  )
}

export default TableFilterDropDown
