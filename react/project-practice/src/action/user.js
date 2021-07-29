import LoginService from '../service/login'
import { REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './const'
export const login = userInfo => dispatch => {
  dispatch({ type: REQUEST })
  LoginService.login(userInfo).then(
    res => {
      dispatch({ type: LOGIN_SUCCESS, payload: res })
    },
    err => {
      dispatch({ type: LOGIN_FAILURE, payload: err })
    }
  )
}

const getMoreUserInfo = (dispatch, userInfo) => {
  LoginService.getMoreUserInfo(userInfo).then(
    res => {
      dispatch({ type: LOGIN_SUCCESS, payload: res })
    },
    err => {
      dispatch({ type: LOGIN_FAILURE, payload: err })
    }
  )
}
