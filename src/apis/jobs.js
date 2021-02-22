import axios from 'axios'

// urls
import { JOBS_SEARCH_URL } from '../urls/index'

export const searchJob = async (conditions) => {
  return await axios.get(JOBS_SEARCH_URL, { 
    params: {
      keyword: conditions.keyword, 
      location: conditions.location 
    }
  })
  .then(res => {
    return res.data
  })
  .catch(e => {
    console.log(e)
  })
}