import React, { useState } from 'react'
import { Prompt } from '../sreact-router-dom'

export default function LoginPage() {
  const [state, setState] = useState(true)
  const handleClick = () => {
    setState(false)
  }
  return (
    <div>
      login page
      <Prompt when={state} message="确定要离开当前页面吗？" />
      <button onClick={handleClick}>change</button>
    </div>
  )
}
