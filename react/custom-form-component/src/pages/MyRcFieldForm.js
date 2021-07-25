import React, { useEffect } from 'react'
// import Form, {Field} from "rc-field-form";
import Form, { Field } from '../components/my-rc-field-form'
import Input from '../components/Input'

// 校验规则
const nameRules = { required: true, message: '请输入姓名！' }
const passworRules = { required: true, message: '请输入密码！' }

export default function MyRcFieldForm() {
  const [form] = Form.useForm()

  const onFinish = val => {
    console.log('onFinish', val) //sy-log
  }

  // 表单校验失败执行
  const onFinishFailed = val => {
    console.log('onFinishFailed', val) //sy-log
  }

  useEffect(() => {
    console.log('form', form) //sy-log
    form.setFieldsValue({ username: 'default' })
  }, [])

  return (
    <div>
      <h3>MyRcFieldForm</h3>
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Field name="username" rules={[nameRules]}>
          <Input placeholder="请输入用户名" />
        </Field>
        <Field name="password" rules={[passworRules]}>
          <Input placeholder="请输入密码" />
        </Field>
        <button>提交</button>
      </Form>
    </div>
  )
}
