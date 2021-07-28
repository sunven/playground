import React, { Component } from 'react'
import { ThemeProvider, UserProvider } from '../Context'
import ConsumerPage from './ConsumerPage'
import ContextTypePage from './ContextTypePage'

export default class ContextPage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      theme: {
        themeColor: 'red',
      },
      user: {
        name: 'tom',
      },
    }
  }

  changeColor = () => {
    const { themeColor } = this.state.theme
    this.setState({
      theme: {
        themeColor: themeColor === 'red' ? 'green' : 'red',
      },
    })
  }

  render() {
    const { theme, user } = this.state
    return (
      <div className="container">
        <h3>ContextPage</h3>
        <button onClick={this.changeColor}>change color</button>
        <ThemeProvider value={theme}>
          <ContextTypePage></ContextTypePage>
          <UserProvider value={user}>
            <ConsumerPage></ConsumerPage>
          </UserProvider>
        </ThemeProvider>
      </div>
    )
  }
}
