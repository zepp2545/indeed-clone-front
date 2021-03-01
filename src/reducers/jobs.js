export const initialState = {
  fetchState: 'initial',
  jobsList: [],
  count: 0
}

export const jobsReducer = (state, action) => {
  switch (action.type) {
    case "fetching":
      return {
        ...state,
        fetchState: 'loading'
      }
    case "done":
      return {
        ...state,
        fetchState: 'done',
        jobsList: action.payload.jobs,
        count: action.payload.count
      }
  }
}