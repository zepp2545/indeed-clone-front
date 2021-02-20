import React, { useReducer } from 'react'
import styled from 'styled-components'

// components
import { Header } from '../components/Header'
import { Container } from '../components/Container'
import { JobSearch } from '../components/JobSearch'
import { Footer } from '../components/Footer'

// constants
import { COLORS } from '../constants/styleConstants'

// reducers
import { InitialState as JobsSearchInitialState, JobsSearchReducer} from '../reducers/JobsSearch'

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

  const [JobsSearchState, dispatch] = useReducer(JobsSearchReducer, JobsSearchInitialState)

  const handleInput = (e) => {
    dispatch({ e: e })
  }

  return (
    <TopWrapper>
      <Header />
      <Container>
        <JobSearch state={JobsSearchState} handleInput={handleInput}/>
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