import React, { Component } from 'react'

const foo = Cmp => props => {
  return (
    <div className="border">
      <Cmp {...props} />
    </div>
  )
}

function Child(props) {
  return <div>Child {props.name}</div>
}

const Foo = foo(Child)

export default class HocPage extends Component {
  render() {
    return (
      <div>
        <h3>Hoc Page</h3>
        <Foo name="msg" />
      </div>
    )
  }
}
