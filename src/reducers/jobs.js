export const initialState = {
  fetchState: 'initial',
  jobsList: []
}

export const jobsReducer = (state, action) => {
  switch (action.fetchState) {
    case "fetching":
      return {
        ...state,
        fetchState: 'loading'
      }
    case "done":
      return {
        ...state,
        fetchState: 'done',
        jobsList: action.payloads.jobs
      }
  }
}