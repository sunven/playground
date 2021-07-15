<template>
  <div>
    <input :type="type" :value="value" @input="onInput" />
  </div>
</template>

<script>
import emitter from '../../mixins/emitter'
export default {
  mixins: [emitter],
  props: {
    value: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
  },
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value)
      //校验
      //this.$parent耦合
      //this.$parent.$emit('validate')
      this.dispatch('Item', 'validate')
    },
  },
}
</script>

<style lang="scss" scoped></style>
