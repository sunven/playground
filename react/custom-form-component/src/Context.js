import React from 'react'

// ThemeContext
export const ThemeContext = React.createContext({ themeCloor: 'pink' })
export const ThemeProvider = ThemeContext.Provider
export const ThemeConsumer = ThemeContext.Consumer

// UserContext
export const UserContext = React.createContext({ themeCloor: 'pink' })
export const UserProvider = UserContext.Provider
export const UserConsumer = UserContext.Consumer
