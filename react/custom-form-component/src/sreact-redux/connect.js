import React, {
  useContext,
  useEffect,
  useReducer,
  useLayoutEffect,
} from 'react'
import Context from './Context'
import { bindActionCreators } from '../sredux'
export default function connect(
  mapStateProps = state => state,
  mapDispatchToProps
) {
  return WrappedComponent => props => {
    // 获取store
    const store = useContext(Context)
    const { getState, dispatch, subscribe } = store
    const stateProps = mapStateProps(getState())
    let dispatchProps = { dispatch }

    if (typeof mapDispatchToProps === 'function') {
      dispatchProps = mapDispatchToProps(dispatch)
    } else if (typeof mapDispatchToProps === 'object') {
      dispatchProps = bindActionCreators(mapDispatchToProps, dispatch)
    }

    // 函数组件实现forceUpdate方法
    const [_, forceUpdate] = useReducer(x => x + 1, 0)
    useLayoutEffect(() => {
      const unsubscribe = subscribe(() => {
        forceUpdate()
      })
      return () => {
        if (unsubscribe) {
          unsubscribe()
        }
      }
    }, [store])

    return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />
  }
}
