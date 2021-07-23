<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <Foo></Foo>
    <Bar></Bar>
    <svg-icon iconClass="dog"></svg-icon>
  </div>
</template>

<script>
import Foo from '@comps/Foo.vue'
import Bar from '@/components/Bar.vue'
console.log(process.env.VUE_APP_BAZ)
export default {
  components: { Foo, Bar },
  name: 'HelloWorld',
  props: {
    msg: String,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
