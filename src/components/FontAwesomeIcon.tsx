import React, { FC } from 'react'
import classNames from 'classnames'
import styled from 'styled-components'

export type IconSize = 'sm' | 'md' | 'lg'

export interface FontAwesomeIconProps extends React.HTMLAttributes<HTMLElement> {
  iconName: string
  size?: IconSize
}

const FontAwesomeIcon: FC<FontAwesomeIconProps> = ({ iconName, size, className, ...props }) => {
  const iconClassName = `fa-icon fas fa-${iconName} ant-menu-item-icon`

  return <Icon className={classNames(iconClassName, className)} size={size} {...props} />
}

export default FontAwesomeIcon

const Icon = styled.i<{ size?: IconSize }>`
  cursor: pointer;
  font-size: ${(p) => (p.size === 'sm' ? '12px' : p.size === 'lg' ? '24px' : '16px')};
`
