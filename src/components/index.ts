import type { Key } from 'react'

export type { ActionsRowProps } from './ActionsRow'
export { default as ActionsRow } from './ActionsRow'

export { default as FullWidthSpace } from './FullWidthSpace'

export type { RowSelectorActionProps } from './RowSelectorAction'
export { default as RowSelectorAction } from './RowSelectorAction'

export type { HoorayTableProps } from './HoorayTable'
export { default as HoorayTable } from './HoorayTable'

export type { HoorayActionButtonProps } from './HoorayActionButton'
export { default as HoorayActionButton } from './HoorayActionButton'

export type { HoorayDropDownProps } from './HoorayDropDown'
export { default as HoorayDropDown } from './HoorayDropDown'

export type { FontAwesomeIconProps } from './FontAwesomeIcon'
export { default as FontAwesomeIcon } from './FontAwesomeIcon'

export type { TableFilterDropDownProps } from './TableFilterDropDown'
export { default as TableFilterDropDown } from './TableFilterDropDown'

export type ButtonType = 'primary' | 'default'
export type FilterValue = boolean | Key | undefined

export interface ActionMenu {
  key: string
  label: string
  icon?: string
}

export interface ActionButton extends ActionMenu {
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
