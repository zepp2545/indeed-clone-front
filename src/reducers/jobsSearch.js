export const initialState = {
  keyword: '',
  location: '',
  page: 1
}

export const jobsSearchReducer = (state, action) => {
  switch (action.type) {
    case "keyword":
      return {
        ...state,
        keyword: action.payload.target.value
      }
    case "location":
      return {
        ...state,
        location: action.payload.target.value
      }
    
  }
}