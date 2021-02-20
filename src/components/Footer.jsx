import React from 'react'
import styled from 'styled-components'

// containers
import { Container } from './Container'
import { BaseButton } from './Buttons/BaseButton'

const FooterWrapper = styled.div`
  background-color: #f3f2f1;
`

const FooterContainer = styled(Container)`
  text-align: center;
  span {
    font-weight: bold;
  }
  
`

const SubmitButton = styled(BaseButton)`
  width: 200px;
  height: 45px;
  line-height: 45px;
  margin: 15px auto;
`

export const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContainer>
        <span>求人に簡単応募</span>
        <SubmitButton>
          履歴書を作成する
        </SubmitButton>
      </FooterContainer>
    </FooterWrapper>
  )
}