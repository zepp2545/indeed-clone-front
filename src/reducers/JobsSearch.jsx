export const InitialState = {
  keyword: '',
  location: ''
}

export const JobsSearchReducer = (state, action) => {
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