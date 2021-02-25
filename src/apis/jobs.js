import axios from 'axios'

// urls
import { JOBS_SEARCH_URL, fetchJobUrl } from '../urls/index'

export const searchJobs = async (conditions) => {
  return await axios.get(JOBS_SEARCH_URL, { 
    params: {
      keyword: conditions.keyword, 
      location: conditions.location,
      page: conditions.page
    }
  })
  .then(res => {
    return res.data
  })
  .catch(e => {
    console.log(e)
  })
}

export const fetchJob = async (jobId) => {
  return await axios.get(fetchJobUrl(jobId))
                    .then(res => { return res.data })
                    .catch(e => { console.log(e) })
}