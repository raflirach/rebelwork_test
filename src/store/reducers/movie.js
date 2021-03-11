const initialState = {
  movies: [],
  movie: {},
  page: 1
}

export const movieReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case "ADD_MOVIES":
      return {
        ...state,
        movies: [...state.movies, ...payload],
        page: state.page + 1
      }
    case "CHANGE_MOVIE":
      return {
        ...state,
        movie: payload
      }
    default:
      return state
  }
}