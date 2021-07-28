import React, { Component } from 'react'
import createForm from '../components/my-rc-form/'

import Input from '../components/Input'

const nameRules = { required: true, message: '请输入姓名！' }
const passworRules = { required: true, message: '请输入密码！' }

//@createForm
// 添加装饰器支持：
// 1.npm run reject
// 2.npm i @babel/plugin-proposal-decorators -D
// 3.修改package.json
// 4.jsconfig.json
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
    const { getFieldDecorator } = this.props.form
    return (
      <div className="container">
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

// 等价装饰器写法
export default createForm(MyRcForm)
// export default MyRcForm
