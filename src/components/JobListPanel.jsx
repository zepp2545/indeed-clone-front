import React from 'react'
import styled from 'styled-components'
import moment from 'moment' 
import 'moment/locale/ja'

// components
import { Tag } from './Tags/Tag'

// styles
// not good. need to be modified
import '../styles/border.css'

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

export const JobListPanel = (props) => {
  const borderClass = props.selectedJob && (props.selectedJob.id === props.job.id) && '-selected'

  return (
    <Panel onClick={() => props.openJobDetail(props.job)} className={borderClass} >
      <Title>{props.job.title}</Title>
      <p>{props.job.prefecture.name}</p>
      {
        props.job.location_detail !== '' &&
        <p>{props.job.location_detail}</p>
      }      
      {props.job.features.map(feature => <Tag key={feature.id}>{feature.name}</Tag>)}
      <Description>
        {props.job.description}
      </Description>
      <DateWrapper>
        {moment(props.job.created_at).fromNow()}
      </DateWrapper>
    </Panel>
  )
}