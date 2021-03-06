import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ConfigProvider,Input, Table as AntdTable,TablePaginationConfig } from 'antd'
import styled from 'styled-components'
import thTH from 'antd/lib/locale/th_TH'

import { getColumnSearchProps, getSorterNumber, Table, FilterValue, ActionButtonInfo, DropDownFitlerType } from '../src/index'

import 'antd/dist/antd.css'
import './assets/globalStyle.css'

import type { ConfigProviderProps } from 'antd/lib/config-provider'
import type { SorterResult, TableRowSelection, ColumnsType } from 'antd/lib/table/interface'

const dataSource: any[] = []
for (let i = 0; i < 46; i++) {
  dataSource.push({
    key: i,
    name: `Edward King ${i}`,
    age: Math.floor(Math.random() * 20 + 20),
    address: `London, Park Lane no. ${i}`,
  })
}


const App = () => {
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([])
  const [sortInfo, setSortInfo] = React.useState<SorterResult<any>>()
  const [paginationInfo, setPaginationInfo] = React.useState<TablePaginationConfig>()
  const [filterDropDownInfo, setFilterDropDownInfo] = React.useState<Record<string, FilterValue | null>>()
  const [filterDropDownType, setFilterDropDownType] = React.useState<DropDownFitlerType>('SEARCH')

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
    selections: [AntdTable.SELECTION_ALL, AntdTable.SELECTION_INVERT, AntdTable.SELECTION_NONE],
  }

  const hasSelected = selectedRowKeys.length > 0

  const antdConfig: ConfigProviderProps =  {
    space:{
      size: 'large',
    }
  }

  console.log('Pagination information', paginationInfo)
  console.log('Sort information', getSorterNumber(sortInfo?.order), sortInfo)
  console.log('Filter information', filterDropDownInfo)
  console.log("Filter drop down type", filterDropDownType)

  const getColumnSearchPropsByDataIndex = (dataIndex: string) => getColumnSearchProps({
    dataIndex,
    locale: 'thTH',
    setDropDownFilterType: (filterType) => setFilterDropDownType(filterType)
  })

  const columns: ColumnsType<string> = [
    {
      ...getColumnSearchPropsByDataIndex('name'),
      title: 'Name',
      dataIndex: 'name'
    },
    {
      ...getColumnSearchPropsByDataIndex('age'),
      title: 'Age',
      dataIndex: 'age'
    },
    {
      ...getColumnSearchPropsByDataIndex('address'),
      title: 'Address',
      dataIndex: 'address'
    },
  ]

  return (
    <ConfigProvider locale={thTH} {...antdConfig}>
      <Container>
        <Table
          title="Hello table title"
          dataSource={dataSource}
          columns={columns}
          locale="thTH"
          antdConfig={antdConfig}
          rowSelection={rowSelection}
          rowSelectorActionProps={{
            hasSelected,
            menuList,
            selectedRowCount: selectedRowKeys.length,
            onDropDownMenuClick: (value) => console.log('Secondary click', value.key),
          }}
          rowSelectorExtraActionProps={{
            menuList,
            buttonDisplayLimit: 3,
            onDropDownMenuClick: (value) => console.log('Secondary extra click', value.key),
          }}
          setSortInfo={setSortInfo}
          setPaginationInfo={setPaginationInfo}
          setFilterDropDownInfo={setFilterDropDownInfo}
        />
      </Container>
    </ConfigProvider>
  )
}

const menuList: ActionButtonInfo[] = [
  {
    key: '1',
    label: 'Action 1',
    icon: 'map-marker-alt',
    onClick: () => console.log('Action 1'),
  },
  {
    key: '2',
    label: 'Action 2',
    icon: 'folder',
    onClick: () => console.log('Action 2'),
  },
  {
    key: '3',
    label: 'Action 3',
    icon: 'camera',
    onClick: () => console.log('Action 3'),
  },
  {
    key: '4',
    label: 'Action 3',
    icon: 'camera',
    onClick: () => console.log('Action 3'),
  }
]

const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
`

ReactDOM.render(<App />, document.getElementById('root'))


