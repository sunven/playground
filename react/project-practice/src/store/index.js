import loginReducer from './loginReducer'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootSaga from '../action/rootSaga'
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  combineReducers({ user: loginReducer }),
  //applyMiddleware(thunk)
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

export default store
