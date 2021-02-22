import React, { Fragment, useReducer, useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { CircularProgress } from '@material-ui/core';

// reducers
import { jobsSearchReducer} from '../reducers/jobsSearch'
import { jobsReducer, initialState as initialJobsState } from '../reducers/jobs'
import { applicationReducer, initialState as initialApplicationState } from '../reducers/application'

// apis
import { searchJob } from '../apis/jobs'
import { SubmitApplication } from '../apis/application'

// components
import { Header } from '../components/Header'
import { JobsSearch } from '../components/JobsSearch'
import { Container } from '../components/Container'
import { JobListPanel } from '../components/JobListPanel'
import { JobDetail } from '../components/JobDetail'
import { ApplicationModal } from '../components/ApplicationModal'

const JobsSearchWrapper = styled.div`
  padding: 10px;
  border-bottom: 1px solid #f2f2f2;
`
const MainContainer = styled(Container)`
  min-width: 1200px;
`

const CircleLoading = styled(CircularProgress)`
  margin: 0 auto;
`

const LeftContent = styled.div`
  width: 40%;
  padding: 0 15px;
  box-sizing: border-box;

  span {
    font-weight: 600;
  }
`
const RightContent = styled.div`
  width: 60%;
  padding: 0 25px;
  box-sizing: border-box;
`

const MainContent = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
`

const CircleWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 100px;
  width: 100%;
`

export const Jobs = () => {

  const useQuery = () => {
    return new URLSearchParams(useLocation().search)
  }

  let keyword = useQuery().get('keyword')
  let location = useQuery().get('location')

  // initial states
  const initialJobsSearchState = {
    keyword: keyword,
    location: location
  }

  const initialState = {
    isJobOpened: false,
    selectedJob: {},
    isJobDetailFixed: false,
    isApplicationModalOpened: false
  }

  // states & reducers
  const [jobsSearchState, dispatch] = useReducer(jobsSearchReducer, initialJobsSearchState)
  const [jobsState, jobsDispatch] = useReducer(jobsReducer, initialJobsState)
  const [applicationState, applicationDispatch] = useReducer(applicationReducer, initialApplicationState)
  const [state, setState] = useState(initialState)

  // Needs the stateRef for mutable state that getScrollTop func refers to
  let stateRef = useRef()
  stateRef.current = state

  const closeJobDetail = () => {
    setState({...initialState, isJobOpened: false, selectedJob: {} })
    window.history.pushState('', '' , `?keyword=${keyword}&location=${location}`)
  }

  const handleInput = (e) => {
    dispatch({ e: e })
  }

  const handleApplicationInput = (e) => {
    applicationDispatch({ type: e.target.name, e: e })
  }

  const getScrollTop = () => {
    if (document.documentElement.scrollTop >= 179) {
      setState({ ...stateRef.current, isJobDetailFixed: true })
    } else {
      setState({ ...stateRef.current, isJobDetailFixed: false })
    } 
  }

  const handleApplicationSubmit = () => {
    applicationDispatch({ type: 'posting' })
    SubmitApplication(applicationState)
    .then(data => {
      applicationDispatch({ type: 'postDone' })
    })
    .catch((e) => {
      if (e.response.status === 406) {
        applicationDispatch({ type: 'notAcceptable' })
      }
    })
  }

  const openJobDetail = (job) => {
    getScrollTop()
    setState({ ...stateRef.current, isJobOpened: true, selectedJob: job })
    window.history.pushState('', '', `?keyword=${keyword}&location=${location}&adv=${job.id}`)
  }

  const closeApplicationModal = () => {
    setState({...state, isApplicationModalOpened: false})
    applicationDispatch({ type: 'initializing' })
  }

  useEffect(() => {
    document.addEventListener('scroll', () => getScrollTop())
    closeJobDetail()
    jobsDispatch({ fetchState: 'fetching' })
    searchJob(initialJobsSearchState).then(data => {
      jobsDispatch({ 
        fetchState: 'done',
        payloads: {
          jobs: data
        }
      })
    })
    return () => {
      document.removeEventListener('scroll', getScrollTop())
    }
  }, [keyword, location])

  return (
    <Fragment>
      <Header />
      <JobsSearchWrapper>
        <Container>
          <JobsSearch state={jobsSearchState} handleInput={handleInput} />
        </Container>     
      </JobsSearchWrapper> 
      <MainContainer>
        <MainContent>
          
            {
              jobsState.fetchState === 'done' ? 
               <Fragment>
                 <LeftContent>
                  { 
                    jobsState.jobsList.length == 0 ?
                      <p><span>{`${initialJobsSearchState.keyword}の求人 - ${initialJobsSearchState.location}`}</span>に一致する求人は見つかりませんでした</p>
                    :
                      jobsState.jobsList.map((job) => 
                        <JobListPanel 
                          job={job} 
                          selectedJob={state.selectedJob} 
                          key={job.id} 
                          openJobDetail={(job) => openJobDetail(job)} 
                        />) 
                  }
                 </LeftContent>
                 <RightContent>
                  {
                    state.isJobOpened &&
                      <JobDetail 
                        job={state.selectedJob} 
                        closeJobDetail={closeJobDetail}
                        isJobDetailFixed={stateRef.current.isJobDetailFixed}
                        openApplicationModal={() => { setState({...state, isApplicationModalOpened: true}) }}
                      />
                  }
                 </RightContent>
                 {
                   state.isApplicationModalOpened &&
                     <ApplicationModal 
                       job={state.selectedJob}
                       isOpen={state.isApplicationModalOpened}
                       onClose={closeApplicationModal}
                       applicationState={applicationState}
                       handleApplicationInput={handleApplicationInput}
                       handleApplicationSubmit={handleApplicationSubmit}
                       setJobId={applicationDispatch}
                     />
                 }
               </Fragment>  
              :
                <CircleWrapper>
                  <CircleLoading />
                </CircleWrapper>     
            }   
        </MainContent>
      </MainContainer>
    </Fragment>
  )
}