export default function createStore(reducer, enhancer) {
  if (enhancer) {
    // 加强dispatch
    return enhancer(createStore)(reducer)
  }

  let state
  let listeners = []
  function getState() {
    return state
  }

  function dispatch(action) {
    state = reducer(state, action)
    listeners.forEach(listener => listener())
    return action
  }

  function subscribe(listener) {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter(lis => lis !== listener)
    }
  }

  dispatch({ type: 'aabbcc/dd/dd/dda' })

  return {
    getState,
    dispatch,
    subscribe,
  }
}
