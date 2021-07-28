import React, { Component } from 'react'
import RouterContext from './Context'

export default class Link extends Component {
  // class组件，用contextType获取Context
  static contextType = RouterContext
  handleClick = e => {
    // 组织默认事件
    e.preventDefault()
    // 跳转
    this.context.history.push(this.props.to)
  }
  render() {
    const { to, children, ...restProps } = this.props
    return (
      <a href={to} {...restProps} onClick={this.handleClick}>
        {children}
      </a>
    )
  }
}
