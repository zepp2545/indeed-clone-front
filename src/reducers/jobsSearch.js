export const initialState = {
  keyword: '',
  location: ''
}

export const jobsSearchReducer = (state, action) => {
  switch (action.e.target.name) {
    case "keyword":
      return {
        ...state,
        keyword: action.e.target.value
      }
    case "location":
      return {
        ...state,
        location: action.e.target.value
      }
  }
}