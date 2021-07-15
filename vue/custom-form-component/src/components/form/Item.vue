<template>
  <div>
    <label>{{ label }}</label>
    <slot></slot>
    <p class="error" v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import Validator from 'async-validator'
import emitter from '@/mixins/emitter'
export default {
  mixins: [emitter],
  componentName: 'Item',
  inject: ['form'],
  data() {
    return {
      error: '',
    }
  },
  props: {
    label: {
      type: String,
      default: '',
    },
    prop: {
      type: String,
      default: '',
    },
  },
  mounted() {
    this.$on('validate', () => {
      return this.validate()
    })
    //将item收集到form,便于form的validate
    if (this.prop) {
      this.dispatch('Form', 'addItem', this)
    }
  },
  methods: {
    validate() {
      //规则
      const rules = this.form.rules[this.prop]
      //值
      const value = this.form.model[this.prop]
      const validator = new Validator({ [this.prop]: rules })
      return validator.validate({ [this.prop]: value }, errors => {
        if (errors) {
          this.error = errors[0].message
        } else {
          this.error = ''
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
