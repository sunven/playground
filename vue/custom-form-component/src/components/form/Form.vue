<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  componentName: 'Form',
  data() {
    return {
      fields: [],
    }
  },
  provide() {
    return {
      form: this,
    }
  },
  props: {
    model: {
      type: Object,
      require,
    },
    rules: {
      type: Object,
    },
  },
  created() {
    //$on需要在create中，
    this.$on('addItem', field => {
      this.fields.push(field)
    })
  },
  methods: {
    validate(cb) {
      // this.$children耦合
      // const tasks = this.$children
      //   .filter(item => item.prop)
      //   .map(item => item.validate())
      // Promise.all(tasks)
      //   .then(() => cb(true))
      //   .catch(() => cb(false))

      //broadcast方式不好获取validate的返回值

      const tasks = this.fields.map(field => field.validate())
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false))
    },
  },
}
</script>

<style lang="scss" scoped></style>
