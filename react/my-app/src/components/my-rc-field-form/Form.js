import React from 'react'
import FieldContext from './FieldContext'
import useForm from './useForm'

export default function Form({ form, children, onFinish, onFinishFailed }) {
  const [formInstance] = useForm(form)
  // 保存提交方法
  formInstance.setCallback({
    onFinish,
    onFinishFailed,
  })
  return (
    <form
      onSubmit={e => {
        // 默认提交事件
        e.preventDefault()
        formInstance.submit()
      }}
    >
      <FieldContext.Provider value={formInstance}>
        {children}
      </FieldContext.Provider>
    </form>
  )
}
