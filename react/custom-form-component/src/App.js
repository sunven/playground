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

function App() {
  return (
    <div className="App">
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

export default App
