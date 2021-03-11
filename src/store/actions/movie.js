import axios from 'axios'

const baseUrl = 'http://api.themoviedb.org/3'
const apiKey = '531394353b1ac68faa3d494a4213fa94'


const addMovies = (payload) => {
  return {
    type: "ADD_MOVIES",
    payload
  }
}

const addSimilarMovies = (payload) => {
  return {
    type: "ADD_SIMILAR_MOVIES",
    payload
  }
}

const changeMovie = (payload) => {
  return {
    type: "CHANGE_MOVIE",
    payload
  }
}

export const fetchMovies = () => {
  return async (dispatch, getState) => {
    try {
      const { page } = getState().movie
      const { data: movies } = await axios({
        url: `${baseUrl}/movie/now_playing?api_key=${apiKey}&page=${page}`
      })
      dispatch(addMovies(movies.results))
    } catch (err) {
      console.log(err.response.data);
    }
  }
}

export const getMovieById = (id) => {
  return async (dispatch, getState) => {
    try {
      const { movies, similarMovies } = getState().movie
      let movie = []
      movie = movies.filter((movie => movie.id === id))
      if(movie.length === 0) movie = similarMovies.filter((movie => movie.id === id))
      dispatch(changeMovie(movie[0]))
    } catch (err) {
      console.log(err.response.data);
    }
  }
}

export const fetchSimilarMovies = (id) => {
  return async (dispatch) => {
    try {
      const { data: movies } = await axios({
        url: `${baseUrl}/movie/${id}/similar?api_key=${apiKey}`
      })
      dispatch(addSimilarMovies(movies.results));
    } catch (err) {
      console.log(err.response.data);
    }
  } 
}