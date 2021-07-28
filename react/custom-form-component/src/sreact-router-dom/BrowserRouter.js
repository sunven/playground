import React, { Component } from 'react'
import { createBrowserHistory } from 'history'
import Router from './Router'

export default class BrowserRouter extends Component {
  constructor(props) {
    super(props)
    // 浏览器history
    this.history = createBrowserHistory()
  }
  render() {
    // 传递children,history
    return <Router children={this.props.children} history={this.history} />
  }
}
