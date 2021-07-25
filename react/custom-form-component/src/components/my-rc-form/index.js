import React, { Component } from 'react'

export default function createForm(Cmp) {
  return class extends Component {
    constructor(props) {
      super(props)
      this.state = {}
      this.options = {}
    }
    getFieldDecorator = (name, option) => InputCmp => {
      this.options[name] = option
      return React.cloneElement(InputCmp, {
        name,
        value: this.state[name] || '',
        onChange: this.handleChange,
      })
    }
    handleChange = e => {
      const { name, value } = e.target
      this.setState({
        [name]: value,
      })
    }
    getFieldsValue = () => this.state
    setFieldsValue = newState => {
      this.setState(newState)
    }
    validateFields = callback => {
      let err = []
      for (let field in this.options) {
        if (this.state[field] === undefined) {
          err.push({
            [field]: 'err',
          })
        }
      }
      if (err.length === 0) {
        // 校验成功
        callback(null, this.state)
      } else {
        callback(err, this.state)
      }
    }
    getForm = () => {
      return {
        form: {
          validateFields: this.validateFields,
          getFieldsValue: this.getFieldsValue,
          setFieldsValue: this.setFieldsValue,
          getFieldDecorator: this.getFieldDecorator,
        },
      }
    }
    render() {
      return <Cmp {...this.props} {...this.getForm()} />
    }
  }
}
