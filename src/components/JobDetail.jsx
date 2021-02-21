import React from 'react'
import styled from 'styled-components'

// css
// this is not cool. have to change this later
import '../styles/job-detail.css'

// components
import { Tag } from './Tags/Tag'

const JobDetailPanel = styled.div`
  border: solid 1px #dcdcdc;
  padding: 15px;
  border-radius: 10px;
`
const PanelHeader = styled.div`
  padding: 15px;
  border-bottom: solid 1px #f1f1f1;
`
const Title = styled.h2`
  font-size: 20px;
  font-weight: 500;
  margin: 0;
`

const PanelBody = styled.div`
  padding: 15px;
`
const Description = styled.div`
  font-size: 14px;
  color: #545454;
  min-height: 60px;
  line-height: 25px;
  padding: 25px 0;
`

const Cross = styled.div`
  position: absolute;
  top: 10px;
  right 20px; 
  font-size: 25px;
  cursor: pointer;
`


export const JobDetail = (props) => {
  const jobDetailClass = props.isJobDetailFixed ? '-fixed' : '-relative'

  return (
    <JobDetailPanel className={jobDetailClass}>
      <Cross onClick={props.closeJobDetail}>×</Cross>
      <PanelHeader>
        <Title>{props.job.title}</Title>
        <p>{props.job.prefecture.name}</p>
        {
          props.job.location_detail !== '' &&
          <p>{props.job.location_detail}</p>
        }  
      </PanelHeader>
      <PanelBody>
        {props.job.features.map(feature => <Tag key={feature.id}>{feature.name}</Tag>)}
        <Description>
          {props.job.description}
        </Description>
      </PanelBody>
    </JobDetailPanel>
  )
}