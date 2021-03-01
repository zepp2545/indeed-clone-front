import React, { Fragment, useReducer, useEffect, useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { CircularProgress } from '@material-ui/core';

// reducers
import { jobsSearchReducer, initialState as initialJobsSearchState } from '../reducers/jobsSearch'
import { jobsReducer, initialState as initialJobsState } from '../reducers/jobs'
import { applicationReducer, initialState as initialApplicationState } from '../reducers/application'

// apis
import { searchJobs, fetchJob } from '../apis/jobs'
import { SubmitApplication } from '../apis/application'

// components
import { Header } from '../components/Header'
import { JobsSearch } from '../components/JobsSearch'
import { Container } from '../components/Container'
import { JobListPanel } from '../components/JobListPanel'
import { JobDetail } from '../components/JobDetail'
import { ApplicationModal } from '../components/ApplicationModal'
import { Pagination } from '../components/Pagination'

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
const SkeletonWrapper = styled.div`
  border: solid 1px #dcdcdc;
  padding: 15px;
  max-width: 638px;
  border-radius: 10px;
  max-height: 95vh;
`


export const Jobs = () => {

  const useQuery = () => {
    return new URLSearchParams(useLocation().search)
  }

  let keyword = useQuery().get('keyword')
  let location = useQuery().get('location')
  let page = useQuery().get('page')

  // initial states
  const initialState = {
    jobFetchingState: 'initial',
    selectedJob: {},
    isJobDetailFixed: false,
    isApplicationModalOpened: false,
    isJobDetailOpened: false
  }

  // initializing initialJobsSearchState for this page purpose
  initialJobsSearchState.keyword = keyword
  initialJobsSearchState.location = location
  initialJobsSearchState.page = page
  
  // states & reducers
  const [jobsSearchState, dispatch] = useReducer(jobsSearchReducer, initialJobsSearchState)
  const [jobsState, jobsDispatch] = useReducer(jobsReducer, initialJobsState)
  const [applicationState, applicationDispatch] = useReducer(applicationReducer, initialApplicationState)
  const [state, setState] = useState(initialState)

  // Needs the stateRef for mutable state that getScrollTop func refers to
  let stateRef = useRef()
  stateRef.current = state

  const closeJobDetail = () => {
    setState({...initialState, jobFetchingState: 'initial', selectedJob: {} })
    let url = `jobs?keyword=${keyword}&location=${location}`
    url = !page ? url : url + `&page=${page}`
    window.history.pushState('', '' , url)
  }

  const handleInput = (e) => {
    dispatch({ type: e.target.name, payload: e })
  }

  const handleApplicationInput = (e) => {
    applicationDispatch({ type: e.target.name, payload: { e: e }})
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
    window.history.pushState('', '', `?keyword=${keyword}&location=${location}&adv=${job.id}`)
    getScrollTop()
    setState({ ...stateRef.current, jobFetchingState: 'fetching', isJobDetailOpened: true, selectedJob: job })
    fetchJob(job.id)
    .then(data => {
      setState({ ...stateRef.current, jobFetchingState: 'done', selectedJob: data })
    })    
  }

  const closeApplicationModal = () => {
    setState({...state, isApplicationModalOpened: false})
    applicationDispatch({ type: 'initializing' })
  }

  useEffect(() => {
    document.addEventListener('scroll', () => getScrollTop())
    closeJobDetail()
    jobsDispatch({ type: 'fetching' })
    searchJobs(jobsSearchState).then(data => {
      jobsDispatch({ 
        type: 'done',
        payload: {
          jobs: data.jobs,
          count: data.count
        }
      })
    })
    return () => {
      document.removeEventListener('scroll', getScrollTop())
    }
  }, [keyword, location, page])

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
                      <p><span>{`${keyword}の求人 - ${location}`}</span>に一致する求人は見つかりませんでした</p>
                    :
                      jobsState.jobsList.map((job) => 
                        <JobListPanel 
                          job={job} 
                          selectedJob={state.selectedJob} 
                          key={job.id} 
                          openJobDetail={(job) => openJobDetail(job)} 
                          isJobDetailOpened={state.isJobDetailOpened}
                        />) 
                  }
                  {
                    jobsState.jobsList.length !== 0 &&
                      <div style={{textAlign: "center"}}>
                        <Pagination 
                          jobsSearchState={jobsSearchState} 
                          currentPage={page}
                          jobsCount={jobsState.count}
                        />
                      </div>
                  }
                 </LeftContent>
                 <RightContent>
                  {
                    (state.jobFetchingState === "done" || state.jobFetchingState === "fetching") &&
                      <JobDetail
                        jobFetchingState={state.jobFetchingState}
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