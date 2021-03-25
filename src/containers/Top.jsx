import React, { useReducer } from 'react'
import styled from 'styled-components'

// components
import { Header } from '../components/Header'
import { Container } from '../components/Container'
import { JobsSearch } from '../components/JobsSearch'
import { Footer } from '../components/Footer'

// constants
import { COLORS } from '../constants/styleConstants'

// reducers
import { initialState as jobsSearchInitialState, jobsSearchReducer } from '../reducers/jobsSearch'

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
const JobSearchWrapper = styled.div`
  padding: 20px;
`

export const Top = () => {

  const [jobsSearchState, dispatch] = useReducer(jobsSearchReducer, jobsSearchInitialState)

  const handleInput = (e) => {
    dispatch({ type: e.target.name, payload: e })
  }

  return (
    <TopWrapper>
      <Header />
      <Container>
        <JobSearchWrapper>
          <JobsSearch state={jobsSearchState} handleInput={handleInput}/>
        </JobSearchWrapper>  
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