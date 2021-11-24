import React, { FC } from 'react'
import { Table, TablePaginationConfig, TableProps } from 'antd'
import styled from 'styled-components'
import omitBy from 'lodash/omitBy'
import isNull from 'lodash/isNull'
import mapValues from 'lodash/mapValues'

import ActionsRow from './ActionsRow'
import FullWidthSpace from './FullWidthSpace'
import RowSelectorAction from './RowSelectorAction'
import HoorayActionButton from './HoorayActionButton'

import { LocaleType, translation } from '../helpers/locale'

import type { SorterResult } from 'antd/lib/table/interface'
import type { FilterValue, HoorayActionButtonProps } from '.'
import type { RowSelectorActionProps } from './RowSelectorAction'

export interface HoorayTableProps extends Pick<TableProps<any>, 'rowSelection'> {
  title?: string
  locale?: LocaleType
  dataSource?: any
  columns?: any
  hidePagination?: boolean
  rowSelectorActionProps: Omit<RowSelectorActionProps, 'locale'>
  rowSelectorExtraActionProps: HoorayActionButtonProps
  setSortInfo?: (sortInfo: SorterResult<any>) => void
  setPaginationInfo?: (paginationInfo: TablePaginationConfig) => void
  setFilterInfo?: (filterInfo: Record<string, FilterValue | null>) => void
  setSearchInfo?: (filterInfo: Record<string, FilterValue | null>) => void
}

const HoorayTable: FC<HoorayTableProps> = ({
  title,
  locale,
  hidePagination,
  rowSelectorActionProps,
  rowSelectorExtraActionProps,
  setSortInfo,
  setPaginationInfo,
  setFilterInfo,
  setSearchInfo,
  ...props
}) => {
  const pagination: TablePaginationConfig = {
    showSizeChanger: true,
    showTotal: (total) => (
      <span>
        {translation('totalItem', locale, {
          type: 'PLURAL',
          plural: total > 1,
        })}
        : {total}
      </span>
    ),
  }

  return (
    <FullWidthSpace direction="vertical" size="small">
      <TableTitle>{title}</TableTitle>

      <TableContainer>
        {rowSelectorActionProps.hasSelected && (
          <div
            style={{
              borderTop: '1px solid #eee',
            }}
          >
            <ActionsRow
              padding="16px 0"
              leftComponent={<RowSelectorAction {...rowSelectorActionProps} locale={locale} />}
              rightComponent={
                rowSelectorExtraActionProps.menuList && rowSelectorExtraActionProps.menuList.length > 0 ? (
                  <HoorayActionButton {...rowSelectorExtraActionProps} />
                ) : (
                  undefined
                )
              }
            />
          </div>
        )}

        <Table
          {...props}
          pagination={!hidePagination ? pagination : false}
          onChange={(pagination, filter, sorter) => {
            const sort = Array.isArray(sorter) ? sorter[0] : sorter
            const filterOutNullValue = omitBy(filter, isNull)
            const convertValueToString = mapValues(filterOutNullValue, (item) => item?.[0])

            setSortInfo?.(sort)
            setPaginationInfo?.(pagination)
            setFilterInfo?.(convertValueToString)
            setSearchInfo?.(convertValueToString)
          }}
        />

        <BottomActionRowSelectionContainer>
          {rowSelectorActionProps.hasSelected && <RowSelectorAction {...rowSelectorActionProps} locale={locale} />}
        </BottomActionRowSelectionContainer>
      </TableContainer>
    </FullWidthSpace>
  )
}

export default HoorayTable

const TableContainer = styled.div`
  border-bottom: 1px solid #eee;
  position: relative;
`

const TableTitle = styled.h2`
  font-size: 24px;
  margin: 0;
`

const BottomActionRowSelectionContainer = styled.div`
  position: absolute;
  bottom: 16px;
`