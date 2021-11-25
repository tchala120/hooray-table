import React from "react"
import { Input } from 'antd'

import TableFilterDropDown, { DropDownFitlerType } from "../components/TableFilterDropDown"
import FontAwesomeIcon from "../components/FontAwesomeIcon"

import type { MutableRefObject } from 'react'
import type { ColumnType } from 'antd/lib/table'
import type { LocaleType } from "./locale"

export interface ColumnSearchPropsGetterOptions {
  locale?: LocaleType
  dataIndex: string
  searchInputRef: MutableRefObject<Input | null | undefined>
  setDropDownFilterType?: (filterType: DropDownFitlerType) => void
}

export const getColumnSearchProps = (options: ColumnSearchPropsGetterOptions): ColumnType<any> => {
  const { searchInputRef } = options

  return {
    filterDropdown: ({ prefixCls, filters, visible, ...props }) => (
      <TableFilterDropDown {...props} searchInputRef={searchInputRef} locale={options.locale} setDropDownFilterType={options.setDropDownFilterType}/>
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
