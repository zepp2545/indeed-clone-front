import React, { Fragment, useReducer, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

// reducers
import { jobsSearchReducer} from '../reducers/JobsSearch'
import { jobsReducer, initialState as initialJobsState } from '../reducers/Jobs'

// apis
import { searchJob } from '../apis/jobs'

// components
import { Header } from '../components/Header'
import { JobSearch } from '../components/JobSearch'
import { Container } from '../components/Container'

const JobSearchWrapper = styled.div`
  padding: 10px;
  border-bottom: 1px solid #efefef;
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
    searchJob(initialJobsSearchState).then(data => {
      console.log(data)
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
      <Container>
      </Container>
    </Fragment>
  )
}