import React from 'react'
import styled from 'styled-components'

// components
import { InputText } from './Inputs/InputText'
import { BaseButton } from './Buttons/BaseButton'

const JobSearchWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
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

export const JobSearch = () => {
  return (
    <JobSearchWrapper>
      <ItemWrapper>
        <InputText placeholder="職種、キーワード、会社名など" />
      </ItemWrapper>
      <ItemWrapper>
        <InputText placeholder="勤務地など" />
      </ItemWrapper>
      <SubmitButton>
        求人検索
      </SubmitButton>
    </JobSearchWrapper>
  )
} 