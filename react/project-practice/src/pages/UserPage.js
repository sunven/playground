import React, { Component } from 'react'
import { connect } from 'react-redux'

export class UserPage extends Component {
  render() {
    const { user } = this.props
    const { id, name, score } = user.userInfo
    return (
      <div>
        <h3>user page</h3>
        <p>id:{id}</p>
        <p>name:{name}</p>
        <p>score:{score}</p>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({ user })

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
