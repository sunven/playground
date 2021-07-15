<template>
  <div>
    <Form :model="model" :rules="rules" ref="formRef">
      <Item label="用户名" prop="username">
        <Input v-model="model.username"></Input>
      </Item>
      <Item label="密码" prop="password">
        <Input v-model="model.password" type="password"></Input>
      </Item>
      <Item>
        <button @click="login">登录</button>
      </Item>
    </Form>
    {{ model }}
  </div>
</template>

<script>
import Form from '@/components/form/Form.vue'
import Item from '@/components/form/Item.vue'
import Input from '@/components/form/Input.vue'
export default {
  data() {
    return {
      model: {
        username: '',
        password: '',
      },
      rules: {
        username: [{ required: true, message: '请输入用户名' }],
        password: [{ required: true, message: '请输入密码' }],
      },
    }
  },
  components: {
    Input,
    Item,
    Form,
  },
  methods: {
    login() {
      this.$refs.formRef.validate(isValid => {
        // if (isValid) {
        //   console.log('登录')
        // } else {
        //   console.log('校验失败')
        // }
        this.$notice({
          title: '校验结果',
          message: isValid ? '登录' : '校验失败',
          duration: 2000,
        }).show()
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
