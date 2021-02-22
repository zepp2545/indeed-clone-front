import axios from 'axios'

// urls
import { APPLICATION_URL } from '../urls/index'

export const SubmitApplication = async (inputs) => {
  return await axios.post(APPLICATION_URL, {
    username: inputs.name,
    email: inputs.email,
    tel: inputs.tel,
    job_id: inputs.job_id
  })
  .then(res => {
    return res.data
  })
  .catch(e => {
    throw e
  })
}