import React, { FC } from 'react'
import { Col, ConfigProvider, Row, Space, Table, TablePaginationConfig, TableProps } from 'antd'
import thTH from "antd/lib/locale/th_TH"
import enUS from "antd/lib/locale/en_US"
import styled from 'styled-components'
import omitBy from 'lodash/omitBy'
import isNull from 'lodash/isNull'
import mapValues from 'lodash/mapValues'

import RowSelectorAction from './RowSelectorAction'
import HoorayActionButton from './HoorayActionButton'

import { LocaleType, translation } from '../helpers/locale'

import type { ColumnsType } from 'antd/lib/table/interface'
import type { ConfigProviderProps } from 'antd/lib/config-provider'
import type { SorterResult } from 'antd/lib/table/interface'
import type { FilterValue, HoorayActionButtonProps } from '.'
import type { RowSelectorActionProps } from './RowSelectorAction'

export interface HoorayTableProps<RecordType extends object = any> extends Pick<TableProps<RecordType>, 'rowSelection' | 'pagination'> {
  title?: string
  antdConfig?: ConfigProviderProps
  locale?: LocaleType
  dataSource?: RecordType[]
  columns?: ColumnsType<RecordType>
  hidePagination?: boolean
  rowSelectorActionProps?: Omit<RowSelectorActionProps, 'locale'>
  rowSelectorExtraActionProps?: HoorayActionButtonProps
  setSortInfo?: (sortInfo: SorterResult<any>) => void
  setPaginationInfo?: (paginationInfo: TablePaginationConfig) => void
  setFilterInfo?: (filterInfo: Record<string, FilterValue | null>) => void
  setSearchInfo?: (filterInfo: Record<string, FilterValue | null>) => void
}

const HoorayTable: FC<HoorayTableProps> = ({
  title,
  locale = 'thTH',
  antdConfig,
  pagination,
  hidePagination,
  rowSelectorActionProps,
  rowSelectorExtraActionProps,
  setSortInfo,
  setPaginationInfo,
  setFilterInfo,
  setSearchInfo,
  ...props
}) => {
  const tablePagination: TablePaginationConfig = {
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
    ...pagination
  }

  return (
    <ConfigProvider {...antdConfig} locale={locale === 'enUS' ? enUS : thTH}>
      <Space style={{ width: '100%' }} direction="vertical" size="small">
        <TableTitle>{title}</TableTitle>

        <TableContainer>
          {rowSelectorActionProps?.hasSelected && (
            <div
              style={{
                borderTop: '1px solid #eee',
                padding: '16px 0'
              }}
            >
              <Row gutter={[16, 16]} align="middle">
                <Col span={12}>
                  <LeftComponentContainer><RowSelectorAction {...rowSelectorActionProps} locale={locale} /></LeftComponentContainer>
                </Col>
                
                {rowSelectorExtraActionProps?.menuList && rowSelectorExtraActionProps.menuList.length > 0 ? (
                  <Col span={12}>
                    <RightComponentContainer>
                      <HoorayActionButton {...rowSelectorExtraActionProps} />
                    </RightComponentContainer>
                  </Col>
                ) : (
                  undefined
                )}
              </Row>
            </div>
          )}

          <Table
            {...props}
            pagination={!hidePagination ? tablePagination : false}
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

          {rowSelectorActionProps?.hasSelected && (
            <BottomActionRowSelectionContainer>
              <RowSelectorAction {...rowSelectorActionProps} locale={locale} />
            </BottomActionRowSelectionContainer>
          )}
        </TableContainer>
      </Space>
    </ConfigProvider>
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

const LeftComponentContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`

const RightComponentContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`