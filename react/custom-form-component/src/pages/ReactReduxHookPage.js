import React, { useCallback } from 'react'
import { useSelector, useDispatch } from '../sreact-redux'

export default function ReactReduxHookPage() {
  const count = useSelector(({ count1 }) => count1)
  const dispatch = useDispatch()
  const add = useCallback(() => {
    dispatch({ type: 'ADD' })
  }, [])
  return (
    <div className="container">
      <h3>ReactReduxHookPage</h3>
      <p>{count}</p>
      <button onClick={add}>add</button>
    </div>
  )
}
