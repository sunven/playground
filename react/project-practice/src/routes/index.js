import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import HomePage from '../pages/HomePage'
import UserPage from '../pages/UserPage'
import LoginPage from '../pages/LoginPage'
import _404Page from '../pages/_404Page'
import PrivateRoute from './PrivateRoute'
import BottomNav from '../components/BottomNav'

export const routes = [
  {
    path: '/',
    exact: true,
    component: HomePage,
  },
  {
    path: '/user',
    component: UserPage,
    Auth: PrivateRoute,
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    component: _404Page,
  },
]

export default function Routes(props) {
  return (
    <Router>
      <Route component={BottomNav} />

      <Switch>
        {routes.map(route =>
          route.auth ? (
            <route.Auth key={route.path + 'route'} {...route} />
          ) : (
            <Route key={route.path + 'route'} {...route} />
          )
        )}
      </Switch>
    </Router>
  )
}
