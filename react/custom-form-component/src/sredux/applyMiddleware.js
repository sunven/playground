export default function applyMiddleware(...middlewares) {
  return createStore => reducer => {
    let store = createStore(reducer)
    //原来的dispatch只能接收对象，不能接收函数，promise等
    let dispatch = store.dispatch

    const midApi = {
      getState: store.getState,
      // dispatch会被闭包引用，真正使用时，该dispatch已经是加强后的dispatch
      dispatch: (action, ...args) => dispatch(action, ...args),
    }

    // 加强dispatch
    // middleware(midApi)返回一个函数
    const middlewaresChain = middlewares.map(middleware => middleware(midApi))
    // middlewaresChain中从右到左执行
    // 倒数第一个middleware接收到参数是store.dispatch
    // 倒数第二个middleware接收到参数是倒数第一个middleware的返回值
    dispatch = compose(...middlewaresChain)(store.dispatch)

    return {
      ...store,
      dispatch,
    }
  }
}

function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }
  if (funcs.length === 1) {
    return funcs[0]
  }
  // 返回的是一个函数
  // 从右到左执行
  return funcs.reduce(
    (acc, cur) =>
      (...args) =>
        acc(cur(...args))
  )
}
