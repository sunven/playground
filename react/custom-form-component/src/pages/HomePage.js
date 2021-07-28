import React from 'react'
import { Redirect } from '../sreact-router-dom'

export default function HomePage() {
  return <Redirect to={{ pathname: '/welcome' }} />
}
