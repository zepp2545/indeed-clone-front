import React from 'react'
import styled from 'styled-components'
import moment from 'moment' 
import 'moment/locale/ja'

// components
import { Tag } from './Tags/Tag'

const Panel = styled.div`
  border: 1px solid #dfdfdf;
  height: 300px;
  width: 100%;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
  cursor: pointer;
`

const Title = styled.h2`
  font-size: 20px;
  font-weight: 500;
`

const Description = styled.div`
  font-size: 14px;
  color: #ababab;
  min-height: 60px;
  line-height: 25px;
  padding: 25px 0;
`

const DateWrapper = styled.div`
  color: #ababab;
`

export const JobPanel = (prop) => {

  return (
    <Panel>
      <Title>{prop.job.title}</Title>
      <p>{prop.job.prefecture.name}</p>
      {
        prop.job !== '' &&
         <p>{prop.job.location_detail}</p>
      }      
      {prop.job.features.map(feature => <Tag>{feature.name}</Tag>)}
      <Description>
        {prop.job.description}
      </Description>
      <DateWrapper>
        {moment(prop.job.created_at).fromNow()}
      </DateWrapper>
    </Panel>
  )
}