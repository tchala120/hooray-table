import type { SortOrder } from 'antd/lib/table/interface'

export const getSorterNumber = (order?: SortOrder) => {
  if (order === 'descend') {
    return -1
  } else if (order === 'ascend') {
    return 1
  }

  return undefined
}
