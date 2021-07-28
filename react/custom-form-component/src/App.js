import ContextPage from './pages/ContextPage'
import HocPage from './pages/HocPage'
import MyRcFieldForm from './pages/MyRcFieldForm'
import MyRcForm from './pages/MyRcForm'
import './App.css'
import DialogPage from './pages/DialogPage'
import ReduxPage from './pages/ReduxPage'
import HooksPage from './pages/HooksPage'
import ReactReduxPage from './pages/ReactReduxPage'
import ReactReduxHookPage from './pages/ReactReduxHookPage'
import WelComePage from './pages/WelComePage'
import {
  Route,
  Link,
  BrowserRouter as Router,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
  useParams,
  withRouter,
} from './sreact-router-dom'
import HomePage from './pages/HomePage'
import UserPage from './pages/UserPage'
import LoginPage from './pages/LoginPage'
import _404Page from './pages/_404Page'
import { Component } from 'react'

function App() {
  return (
    <div className="App">
      <div className="container">
        <Router>
          <Link to="/">首页</Link>
          <Link to="/user">用户中心</Link>
          <Link to="/login">登录</Link>
          <Link to="/product/1">产品</Link>
          {/* 独占匹配，匹配到一个后，后面不在匹配 */}
          <Switch>
            <Route
              exact
              path="/"
              //children={children}
              component={HomePage}
              render={render}
            />
            <Route path="/user" component={UserPage} />
            <Route path="/login" component={LoginPage} />
            <Route
              path="/product/:id"
              //component={ClassComponentProduct}
              render={() => <ClassRenderProduct />}
            />
            <Route path="/product" component={FunComponentProduct} />
            <Route path="/welcome" component={WelComePage} />
            <Route component={_404Page} />
          </Switch>
        </Router>
      </div>
      <ContextPage></ContextPage>
      <HocPage />
      <MyRcFieldForm />
      <MyRcForm />
      <DialogPage />
      <ReduxPage />
      <HooksPage />
      <ReactReduxPage name="ReactReduxPage" />
      <ReactReduxHookPage />
    </div>
  )
}

// 函数组件用于component
function FunComponentProduct(props) {
  const { match } = props
  const { params, url } = match
  const { id } = params
  return (
    <div>
      <h1>Product:{id}</h1>
      <Link to={url + '/detail'}>详情</Link>
      <Route path={url + '/detail'} component={Detail} />
    </div>
  )
}

// 函数组件用于render
function FunRenderProduct() {
  const history = useHistory()
  const location = useLocation()
  const match = useRouteMatch()
  const params = useParams()
  console.log('history', history)
  console.log('location', location)
  console.log('match', match)
  console.log('params', history)

  const { url } = match
  const { id } = params
  return (
    <div>
      <h1>Product:{id}</h1>
      <Link to={url + '/detail'}>详情</Link>
      <Route path={url + '/detail'} component={Detail} />
    </div>
  )
}

// class组件用于render
class ClassRenderProduct extends Component {
  render() {
    console.log(this.props)
    const { url, params } = this.props.match
    const { id } = params
    return (
      <div>
        <h1>Product:{id}</h1>
        <Link to={url + '/detail'}>详情</Link>
        <Route path={url + '/detail'} component={Detail} />
      </div>
    )
  }
}
// 高阶组件
ClassRenderProduct = withRouter(ClassRenderProduct)

function Detail() {
  return (
    <div>
      <h3>Detail</h3>
    </div>
  )
}

function children(props) {
  console.log('children props', props) //sy-log
  return <div>children</div>
}

function render(props) {
  console.log('render props', props) //sy-log
  return <div>render</div>
}

export default App
