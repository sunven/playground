import RouterContext from './Context'

// class组件，用在route的render中时，没有props，需要用到高阶组件
export default function withRouter(WarppedComponent) {
  return props => {
    return (
      <RouterContext.Consumer>
        {context => <WarppedComponent {...props} {...context} />}
      </RouterContext.Consumer>
    )
  }
}
