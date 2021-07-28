import React, { Component } from 'react'
import { connect } from '../sreact-redux'
import { bindActionCreators } from '../sredux'

class ReactReduxPage extends Component {
  render() {
    // console.log('this.props', this.props)
    const { count1, dispatch, add } = this.props
    return (
      <div className="container">
        <h3>ReactReduxPage</h3>
        <p>{count1}</p>
        <button onClick={() => dispatch({ type: 'ADD' })}>dispatch add</button>
        <button onClick={add}>add</button>
      </div>
    )
  }
}

const mapStateToProps = ({ count1 }) => ({ count1 })
// 对象
// const mapDispatchToProps = {
//   add: () => ({ type: 'ADD' }),
// }
// 方法
const mapDispatchToProps = dispatch => {
  let creators = {
    add: () => ({ type: 'ADD' }),
    minus: () => ({ type: 'MINUS' }),
  }
  creators = bindActionCreators(creators, dispatch)
  return { dispatch, ...creators }
}
const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return { ...stateProps, ...dispatchProps, ...ownProps, a: 'b' }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ReactReduxPage)
