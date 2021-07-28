import React, { Component } from 'react'
import RouterContext from './Context'
import matchPath from './matchPath'

export default class Route extends Component {
  render() {
    return (
      // class组件，Consumer中可以使用context
      <RouterContext.Consumer>
        {context => {
          const { location } = context
          const { path, children, component, render, computedMatch } =
            this.props
          // 匹配
          // computedMatch有值，表示在Switch中已经匹配过了，这里直接用
          const match = computedMatch
            ? computedMatch
            : path
            ? matchPath(location.pathname, this.props)
            : context.match
          const props = { ...context, match }
          // 优先级children, component, render
          return (
            // match可能已经变化，再用一个Provider覆盖
            <RouterContext.Provider value={props}>
              {match
                ? children
                  ? typeof children === 'function'
                    ? children(props)
                    : children
                  : component
                  ? React.createElement(component, props)
                  : render
                  ? render(props)
                  : null
                : typeof children === 'function'
                ? children(props)
                : null}
            </RouterContext.Provider>
          )
        }}
      </RouterContext.Consumer>
    )
  }
}
