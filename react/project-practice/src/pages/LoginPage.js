import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../action/user'
import { LOGIN_SAGA } from '../action/const'

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
    }
  }
  nameChange = e => {
    this.setState({ name: e.target.value })
  }
  render() {
    const { name } = this.state
    const { isLogin, location, login, err, loading } = this.props
    console.log(isLogin)
    if (isLogin) {
      // 已经登录
      const { from = '/' } = location.state || {}
      return <Redirect to={from} />
    } else {
      return (
        <div>
          <h3>login page</h3>
          <input type="text" value={name} onChange={this.nameChange} />
          <button onClick={() => login({ name })}>
            {loading ? 'loading...' : '登录'}
          </button>
          <p className="red">{err.msg}</p>
        </div>
      )
    }
  }
}

const mapStateToProps = ({ user }) => ({
  isLogin: user.isLogin,
  err: user.err,
  loading: user.loading,
})

const mapDispatchToProps = {
  login: userInfo => ({ type: LOGIN_SAGA, payload: userInfo }),
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
