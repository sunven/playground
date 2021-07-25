import React, { Component } from 'react'
import { ThemeConsumer, UserConsumer } from '../Context'

export default class ConsumerPage extends Component {
  render() {
    return (
      <div>
        <ThemeConsumer>
          {context => (
            <div className={context.themeColor}>
              ConsumerPage
              <UserConsumer>{user => <p>{user.name}</p>}</UserConsumer>
            </div>
          )}
        </ThemeConsumer>
      </div>
    )
  }
}
