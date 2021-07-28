export default function combineReducers(reducers) {
  return function combination(state = {}, action) {
    let nextState = {}
    let hasChanged = false
    for (let key in reducers) {
      const reducer = reducers[key]
      nextState[key] = reducer(state[key], action)
      hasChanged = hasChanged || nextState[key] !== state[key]
    }
    //replaceReducer
    //{a:1}
    //{a:1,b:2}
    hasChanged =
      hasChanged || Object.keys(state).length !== Object.keys(nextState).length
    return hasChanged ? nextState : state
  }
}
