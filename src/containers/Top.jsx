import React from 'react'
import styled from 'styled-components'

// components
import { Header } from '../components/Header'
import { Container } from '../components/Container'
import { JobSearch } from '../components/JobSearch'
import { Footer } from '../components/Footer'

// constants
import { COLORS } from '../constants/styleConstants'

const DescriptionWrapper = styled.p`
  width: 80%;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 30px;
  span {
    color: ${COLORS.MAIN};
    font-weight: bold;
  }
`

const TopWrapper = styled.div`
  color: ${COLORS.DEFAULT_TEXT}
`

export const Top = () => {
  return (
    <TopWrapper>
      <Header />
      <Container>
        <JobSearch />
        <DescriptionWrapper>
          <span>履歴書・プロフィールを登録</span> – すぐに登録できます
        </DescriptionWrapper>
        <DescriptionWrapper>
          <span>求人掲載をご検討の企業様</span> – Ingeek で始めましょう
        </DescriptionWrapper>
      </Container>
      <Footer />
    </TopWrapper>
  )
}