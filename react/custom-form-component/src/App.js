import ContextPage from './pages/ContextPage'
import HocPage from './pages/HocPage'
import MyRcFieldForm from './pages/MyRcFieldForm'
import MyRcForm from './pages/MyRcForm'
import './App.css'

function App() {
  return (
    <div className="App">
      <ContextPage></ContextPage>
      <HocPage />
      <MyRcFieldForm />
      <MyRcForm />
    </div>
  )
}

export default App
