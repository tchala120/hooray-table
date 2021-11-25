import type { Key } from 'react'

export type { RowSelectorActionProps } from './RowSelectorAction'
export { default as RowSelectorAction } from './RowSelectorAction'

export type { TableProps } from './Table'
export { default as Table } from './Table'

export type { ActionButtonProps } from './ActionButton'
export { default as HoorayActionButton } from './ActionButton'

export type { DropDownProps } from './DropDown'
export { default as DropDown } from './DropDown'

export type { TableFilterDropDownProps, DropDownFitlerType } from './TableFilterDropDown'
export { default as TableFilterDropDown } from './TableFilterDropDown'

export type ButtonType = 'primary' | 'default'
export type FilterValue = boolean | Key | undefined

export interface ActionMenu {
  key: string
  label: string
  icon?: string
}

export interface ActionButtonInfo extends ActionMenu {
  type?: ButtonType
  onClick?: () => void
}

export interface ActionMenuInfo {
  key: string
}

export interface SearchValue {
  column?: string
  value?: Key
}
