import { createStore, applyMiddleware, combineReducers } from '../sredux'
import isPromise from 'is-promise'
import { isFSA } from 'flux-standard-action'
// import thunk from 'redux-thunk'
// import logger from 'redux-logger'

//如果中间件的

function thunk({ dispatch, getState }) {
  // 这里的dispatch, getState是传进来的，不是原始store上的dispatch, getState
  // action就是传给dispatch的action
  return next => action => {
    // 如果是action是function,这里会进入两次，
    // 第一次是action === 'function'
    // 第二次是action.type==='ADD'
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }
    return next(action)
  }
}

function logger({ getState }) {
  return next => action => {
    console.log('pre state', getState())
    console.log('action', action)
    const ret = next(action)
    console.log('next state', getState())
    return ret
  }
}

function promise({ dispatch }) {
  return next => action => {
    if (!isFSA(action)) {
      // 不是标准action
      // 如果是promise，则then,不是则交给下一个中间件
      return isPromise(action) ? action.then(dispatch) : next(action)
    }

    // 是标准action
    // 如果payload是promise,则then,不是则交给下一个中间件
    return isPromise(action.payload)
      ? action.payload.then(res => dispatch({ ...action, payload: res }))
      : next(action)
  }
}

function countReducer(state = 0, action) {
  switch (action.type) {
    case 'ADD':
      return state + 1
    case 'MINUS':
      return state - (action.payload || 1)
    default:
      return state
  }
}

function countReducer2(state = { number: 2 }, { type, payload }) {
  switch (type) {
    case 'ADD2':
      return { ...state, number: state.number + payload }
    default:
      return state
  }
}

//中间件执行顺序从右到左
//thunk(logger(promise(dispatch)))
const store = createStore(
  combineReducers({ count1: countReducer, count2: countReducer2 }),
  applyMiddleware(thunk, logger, promise)
)
export { countReducer }
export default store
