import React, { Component } from 'react'
import RouterContext from './Context'
import matchPath from './matchPath'

export default class Switch extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {context => {
          const { location } = context
          let match //找到匹配元素，设为true
          let element //匹配的元素
          const { children } = this.props
          // 只找到匹配的渲染
          // 如果循环完还匹配不到，那么element就是最后一个，也就是404
          React.Children.forEach(children, child => {
            if (match == null && React.isValidElement(child)) {
              element = child
              const { path } = child.props
              match = path
                ? matchPath(location.pathname, child.props)
                : context.match
            }
          })
          // 这里的element是一个元素
          return match
            ? React.cloneElement(element, { computedMatch: match })
            : null
        }}
      </RouterContext.Consumer>
    )
  }
}
