import React from 'react'
import Context from './Context'
export default function Provider({ children, store }) {
  return <Context.Provider value={store}>{children}</Context.Provider>
}
