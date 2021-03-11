import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { movieReducer } from "./reducers/movie";

const rootReducer = combineReducers({
  movie: movieReducer
})

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

export default store