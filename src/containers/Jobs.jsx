import React, { Fragment, useReducer, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { CircularProgress } from '@material-ui/core';

// reducers
import { jobsSearchReducer} from '../reducers/JobsSearch'
import { jobsReducer, initialState as initialJobsState } from '../reducers/Jobs'

// apis
import { searchJob } from '../apis/jobs'

// components
import { Header } from '../components/Header'
import { JobSearch } from '../components/JobSearch'
import { Container } from '../components/Container'
import { JobPanel } from '../components/JobPanel'

const JobSearchWrapper = styled.div`
  padding: 10px;
  border-bottom: 1px solid #f2f2f2;
`
const MainContainer = styled(Container)`
  min-width: 1100px;
`

const CircleLoading = styled(CircularProgress)`
  margin: 0 auto;
`

const LeftContent = styled.div`
  width: 40%;
`
const RightContent = styled.div`
  width: 60%;
`

const MainContent = styled.div`
  display: flex;
  justify-content: start;
`

const CircleWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 100px;
`

export const Jobs = () => {

  const useQuery = () => {
    return new URLSearchParams(useLocation().search)
  }

  let keyword = useQuery().get('keyword')
  let location = useQuery().get('location')

  const initialJobsSearchState = {
    keyword: keyword,
    location: location
  }

  const [jobsSearchState, dispatch] = useReducer(jobsSearchReducer, initialJobsSearchState)
  const [jobsState, jobsDispatch] = useReducer(jobsReducer, initialJobsState)

  const handleInput = (e) => {
    dispatch({ e: e })
  }

  useEffect(() => {
    jobsDispatch({ fetchState: 'fetching' })
    searchJob(initialJobsSearchState).then(data => {
      jobsDispatch({ 
        fetchState: 'done',
        payloads: {
          jobs: data
        }
      })
    })
  }, [keyword, location])

  return (
    <Fragment>
      <Header />
      <JobSearchWrapper>
        <Container>
          <JobSearch state={jobsSearchState} handleInput={handleInput} />
        </Container>     
      </JobSearchWrapper> 
      <MainContainer>
        <MainContent>
          <LeftContent>
            {
              jobsState.fetchState === 'done' ? 
                jobsState.jobsList.map((job) => <JobPanel job={job} key={job.id} />)
              :
                <CircleWrapper>
                  <CircleLoading />
                </CircleWrapper>     
            }
          </LeftContent>
          <RightContent>
          </RightContent>
        </MainContent>
        
        
      </MainContainer>
    </Fragment>
  )
}