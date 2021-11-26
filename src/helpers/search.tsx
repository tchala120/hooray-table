import React from "react"

import TableFilterDropDown, { DropDownFitlerType } from "../components/TableFilterDropDown"
import FontAwesomeIcon from "../components/FontAwesomeIcon"

import type { ColumnType } from 'antd/lib/table'
import type { LocaleType } from "./locale"

export interface ColumnSearchPropsGetterOptions {
  locale?: LocaleType
  dataIndex: string
  setDropDownFilterType?: (filterType: DropDownFitlerType) => void
}

export const getColumnSearchProps = (options: ColumnSearchPropsGetterOptions): ColumnType<any> => {
  return {
    filterDropdown: ({ prefixCls, filters, visible, ...props }) => (
      <TableFilterDropDown {...props} locale={options.locale} setDropDownFilterType={options.setDropDownFilterType}/>
    ),
    filterIcon: (filtered) => <FontAwesomeIcon iconName="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
    sorter: true,
  }
}
