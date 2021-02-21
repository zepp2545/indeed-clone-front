import React from 'react'
import styled from 'styled-components'

// components
import { Tag } from './Tags/Tag'

const JobDetailPanel = styled.div`
  border: solid 1px #dcdcdc;
  padding: 15px;
  border-radius: 10px;
  position: relative;
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


export const JobDetail = (prop) => {
  return (
    <JobDetailPanel>
      <Cross onClick={prop.closeJobDetail}>×</Cross>
      <PanelHeader>
        <Title>{prop.job.title}</Title>
        <p>{prop.job.prefecture.name}</p>
        {
          prop.job.location_detail !== '' &&
          <p>{prop.job.location_detail}</p>
        }  
      </PanelHeader>
      <PanelBody>
        {prop.job.features.map(feature => <Tag key={feature.id}>{feature.name}</Tag>)}
        <Description>
          {prop.job.description}
        </Description>
      </PanelBody>
    </JobDetailPanel>
  )
}