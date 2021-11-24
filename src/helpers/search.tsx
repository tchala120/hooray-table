import React from "react"
import { Input } from 'antd'

import TableFilterDropDown from "../components/TableFilterDropDown"
import FontAwesomeIcon from "../components/FontAwesomeIcon"

import type { MutableRefObject } from 'react'
import type { ColumnType } from 'antd/lib/table'

export interface ColumnSearchPropsGetterOptions {
  dataIndex: string
  searchInputRef: MutableRefObject<Input | null | undefined>
}

export const getColumnSearchProps = (options: ColumnSearchPropsGetterOptions): ColumnType<any> => {
  const { searchInputRef } = options

  return {
    filterDropdown: ({ prefixCls, filters, visible, ...props }) => (
      <TableFilterDropDown {...props} searchInputRef={searchInputRef} locale="enUS" />
    ),
    filterIcon: (filtered) => <FontAwesomeIcon iconName="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInputRef.current && searchInputRef.current.select(), 100)
      }
    },
    sorter: true,
  }
}
