import React, { Component } from 'react'
import store from '../store'

export default class ReduxPage extends Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate()
    })
  }
  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe()
  }
  add = () => {
    store.dispatch({ type: 'ADD' })
  }
  asyncAdd = () => {
    store.dispatch((dispatch, getState) => {
      // 该dispatch已经是加强后的dispatch
      // 调用会进入到中间件
      setTimeout(() => {
        dispatch({ type: 'ADD' })
      }, 1000)
    })
  }
  asyncAdd2 = () => {
    store.dispatch((dispatch, getState) => {
      setTimeout(() => {
        dispatch({ type: 'ADD2', payload: 5 })
      }, 1000)
    })
  }
  promiseMinus = () => {
    // store.dispatch(
    //   Promise.resolve({
    //     type: 'MINUS',
    //     payload: 1,
    //   })
    // )
    store.dispatch({
      type: 'MINUS',
      payload: Promise.resolve(2),
    })
  }
  render() {
    return (
      <div className="container">
        <h3>ReduxPage</h3>
        <h4>count1</h4>
        <p>{store.getState().count1}</p>
        <button onClick={this.add}>add</button>
        <button onClick={this.asyncAdd}>async add</button>
        <button onClick={this.promiseMinus}>promise minus</button>
        <h4>count2</h4>
        <p>{store.getState().count2.number}</p>
        <button onClick={this.asyncAdd2}>async add</button>
      </div>
    )
  }
}
