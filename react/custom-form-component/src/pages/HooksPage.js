import React, { useReducer } from 'react'
import { countReducer } from '../store'

export default function HooksPage() {
  const [state, dispatch] = useReducer(countReducer, 0)
  return (
    <div className="container">
      <h3>HooksPage</h3>
      <p>{state}</p>
      <button onClick={() => dispatch({ type: 'ADD' })}>add</button>
    </div>
  )
}
