import React, { Component } from 'react'
import FieldContext from './FieldContext'

export default class Field extends Component {
  static contextType = FieldContext
  componentDidMount() {
    //   注册当前字段
    const { registerField } = this.context
    this.cancelRegister = registerField(this)
  }
  componentWillUnmount() {
    //   取消注册
    this.cancelRegister && this.cancelRegister()
  }
  onStoreChange() {
    //   更新
    this.forceUpdate()
  }
  getControled = () => {
    const { getFieldValue, setFieldsValue } = this.context
    const { name } = this.props
    return {
      value: getFieldValue(name), //从store取值
      onChange: e => {
        const newValue = e.target.value
        //   新值存到store
        setFieldsValue({ [name]: newValue })
      },
    }
  }
  render() {
    const { children } = this.props
    const newChildren = React.cloneElement(children, this.getControled())
    return newChildren
  }
}
