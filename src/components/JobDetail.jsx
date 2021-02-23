import React from 'react'
import styled from 'styled-components'

// css
// this is not cool. have to change this later
import '../styles/job-detail.css'

// components
import { Tag } from './Tags/Tag'
import { BaseButton } from './Buttons/BaseButton'

const JobDetailPanel = styled.div`
  border: solid 1px #dcdcdc;
  padding: 15px;
  max-width: 638px;
  border-radius: 10px;
  max-height: 95vh;
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

const ModalButton = styled(BaseButton)`
  width: 200px;
  height: 45px;
  font-size: 20px;
  line-height: 45px;
  font-weight: 600;
`

const PanelBody = styled.div`
  padding: 15px;
  overflow-y: scroll;
  max-height: 65vh;
`
const Description = styled.div`
  font-size: 14px;
  color: #545454;
  min-height: 60px;
  line-height: 25px;
  padding: 25px 0;
  white-space: pre-wrap;
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
        <ModalButton onClick={props.openApplicationModal}>
          応募画面へ進む
        </ModalButton>
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