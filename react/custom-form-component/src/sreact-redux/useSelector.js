import { useContext, useLayoutEffect, useReducer } from 'react'
import Context from './Context'

export default function useSelector(selector) {
  const store = useContext(Context)
  const { getState, subscribe } = store
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

  return selector(getState())
}
