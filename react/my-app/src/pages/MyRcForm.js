import React, { Component } from 'react'
import createForm from '../components/my-rc-form/'

import Input from '../components/Input'

const nameRules = { required: true, message: '请输入姓名！' }
const passworRules = { required: true, message: '请输入密码！' }

//@createForm
class MyRcForm extends Component {
  componentDidMount() {
    this.props.form.setFieldsValue({ username: 'default' })
  }

  submit = () => {
    const { validateFields } = this.props.form
    validateFields((err, val) => {
      if (err) {
        console.log('err', err) //sy-log
      } else {
        console.log('校验成功', val) //sy-log
      }
    })
  }

  render() {
    console.log(this)
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <h3>MyRcForm</h3>
        {getFieldDecorator('username', { rules: [nameRules] })(
          <Input placeholder="Username" />
        )}
        {getFieldDecorator('password', { rules: [passworRules] })(
          <Input placeholder="Password" />
        )}
        <button onClick={this.submit}>submit</button>
      </div>
    )
  }
}
const s = createForm(MyRcForm)
console.log(s)
export default s
