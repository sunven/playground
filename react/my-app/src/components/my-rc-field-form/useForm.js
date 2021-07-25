import { useRef } from 'react'

class FormStore {
  constructor() {
    // 字段值
    this.store = {}
    // 字段
    this.fieldEntities = []
    // 回调方法
    this.callback = {}
  }
  //   设置回调方法
  setCallback = callback => {
    this.callback = {
      ...callback,
      ...this.callback,
    }
  }
  //   注册字段
  registerField = field => {
    this.fieldEntities.push(field)
    // 返回取消注册方法
    return () => {
      this.fieldEntities = this.fieldEntities.filter(entity => entity !== field)
      delete this.store[field.props.name]
    }
  }
  //   获取字段值
  getFieldValue = name => {
    return this.store[name]
  }
  //   获取字段值
  getFieldsValue = () => {
    return this.store
  }
  //   设置字段值
  setFieldsValue = newStore => {
    this.store = { ...this.store, ...newStore }
    // 更新,只更新变化的field
    const keys = Object.keys(newStore)
    this.fieldEntities
      .filter(entity => keys.includes(entity.props.name))
      .forEach(entity => {
        entity.onStoreChange()
      })
  }
  //   校验
  validate = () => {
    let err = []
    // todo
    this.fieldEntities.forEach(entity => {
      const { name, rules } = entity.props
      let value = this.store[name]
      let rule = rules && rules[0]
      if (rule && rule.required && (value === undefined || value === '')) {
        //  出错
        err.push({
          [name]: rule.message,
          value,
        })
      }
    })
    return err
  }
  //   提交
  submit = () => {
    let err = this.validate()
    if (err.length) {
      // 失败
      this.callback.onFinishFailed(err)
    } else {
      // 成功
      this.callback.onFinish(this.store)
    }
  }
  getForm = () => {
    return {
      setCallback: this.setCallback,
      submit: this.submit,
      registerField: this.registerField,
      setFieldsValue: this.setFieldsValue,
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldsValue,
    }
  }
}

export default function useForm(form) {
  const formRef = useRef()
  if (!formRef.current) {
    if (form) {
      formRef.current = form
    } else {
      const formStore = new FormStore()
      formRef.current = formStore.getForm()
    }
  }
  return [formRef.current]
}
