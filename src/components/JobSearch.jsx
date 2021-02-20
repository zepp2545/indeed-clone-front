import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

// components
import { BaseButton } from './Buttons/BaseButton'

const JobSearchWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`
const Input = styled.input`
  height: 40px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 7px;
  border: 1px solid #989898;
  padding: 2px 10px;
`

const ItemWrapper = styled.div`
  width: 38%;
  padding: 10px;
`

const SubmitButton = styled(BaseButton)`
  width: 110px;
  height: 45px;
  line-height: 45px;
  margin-left: 20px;
  
`

const ButtonLink = styled(Link)`
  text-decoration: none;
`

export const JobSearch = (props) => {

  const parsedUrl = (keyword, location) => {
    return (`/jobs?keyword=${keyword}&location=${location}`)
  }

  return (
    <JobSearchWrapper>
      <ItemWrapper>
        <Input
          placeholder="職種、キーワード、会社名など" 
          name="keyword"
          value={props.state.keyword} 
          onChange={props.handleInput}
        />
      </ItemWrapper>
      <ItemWrapper>
        <Input 
          placeholder="勤務地など" 
          name="location" 
          value={props.state.location} 
          onChange={props.handleInput} 
        />
      </ItemWrapper>
      <ButtonLink to={parsedUrl(props.state.keyword, props.state.location)}>
        <SubmitButton>
          求人検索
        </SubmitButton>
      </ButtonLink>
    </JobSearchWrapper>
  )
} 