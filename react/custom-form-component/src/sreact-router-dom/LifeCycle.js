import { Component } from 'react'

export default class LifeCycle extends Component {
  componentDidMount() {
    this.props.onMount && this.props.onMount.call(this, this)
  }
  componentWillUnmount() {
    this.props.onUnmount && this.props.onUnmount.call(this, this)
  }
  render() {
    return null
  }
}
