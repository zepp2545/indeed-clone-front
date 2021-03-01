export const initialState = {
  name: '',
  email: '',
  tel: '',
  job_id: '',
  postState: 'initial'
}

export const applicationReducer = (state, action) => {
  switch (action.type) {
    case "name":
      return {
        ...state,
        name: action.payload.e.target.value
      }
    case "email":
      return {
        ...state,
        email: action.payload.e.target.value
      }
    case "tel":
      return {
        ...state,
        tel: action.payload.e.target.value
      }
    case "modalShowing":
      return {
        ...state,
        job_id: action.payload.jobId
      }
    case "posting":
      return {
        ...state,
        postState: 'posting'
      }
    case "postDone":
      return {
        ...state,
        postState: 'postDone',
      }
    case "initializing":
      return {
        ...initialState
      }
    case "notAcceptable":
      return {
        ...state,
        postState: 'notAcceptable'
      }
  }
}