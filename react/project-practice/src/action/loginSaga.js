import {
  //  takeEvery,
  take,
  call,
  put,
  fork,
} from 'redux-saga/effects'
import LoginService from '../service/login'
import { REQUEST, LOGIN_SAGA, LOGIN_SUCCESS, LOGIN_FAILURE } from './const'

// call:调用异步操作
// put:状态更新
// take:监听

// worker saga
function* loginHandle(action) {
  yield put({
    type: REQUEST,
  })
  try {
    // 调用异步操作
    const res = yield call(LoginService.login, action.payload)
    const res2 = yield call(LoginService.getMoreUserInfo, res)
    yield put({
      type: LOGIN_SUCCESS,
      payload: res2,
    })
  } catch (err) {
    yield put({
      type: LOGIN_FAILURE,
      payload: err,
    })
  }
}

// watcher saga
function* loginSaga() {
  yield takeEvery(LOGIN_SAGA, loginHandle)
}

const takeEvery = (pattern, saga, ...args) =>
  fork(function* () {
    while (true) {
      const action = yield take(pattern)
      yield fork(saga, ...args.concat(action))
    }
  })

export default loginSaga
