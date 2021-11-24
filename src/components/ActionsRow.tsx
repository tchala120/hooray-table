import React, { FC } from 'react'
import { Col, Row } from 'antd'
import styled from 'styled-components'

export interface ActionsRowProps {
  leftComponent?: React.ReactNode
  rightComponent?: React.ReactNode
  padding?: string
  margin?: string
}

const ActionsRow: FC<ActionsRowProps> = ({ padding, margin, leftComponent, rightComponent }) => {
  return (
    <ActionRowContainer gutter={[16, 16]} align="middle" padding={padding} margin={margin}>
      <Col span={12}>
        <LeftComponentContainer>{leftComponent}</LeftComponentContainer>
      </Col>
      {rightComponent && (
        <Col span={12}>
          <RightComponentContainer>{rightComponent}</RightComponentContainer>
        </Col>
      )}
    </ActionRowContainer>
  )
}

export default ActionsRow

const ActionRowContainer = styled(Row)<{ padding?: string; margin?: string }>`
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};
`

const LeftComponentContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`

const RightComponentContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`
