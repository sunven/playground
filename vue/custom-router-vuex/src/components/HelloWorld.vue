<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="container">
      <router-link to="/foo">Foo</router-link> |
      <router-link to="/bar">Bar</router-link>
      <router-view></router-view>
    </div>
    <div class="container">
      <p @click="$store.commit('add')">sync:{{ $store.state.count }}</p>
      <p @click="$store.dispatch('add')">async:{{ $store.state.count }}</p>
      <p>getters.halfCount:{{ $store.getters.halfCount }}</p>
      <p>getters.doubleCount:{{ $store.getters.doubleCount }}</p>
    </div>
  </div>
</template>

<script>
export default {
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
.container {
  width: 600px;
  /* height: 500px; */
  padding: 20px;
  margin: 20px auto;
  border: 1px red solid;
  border-radius: 6px;
}
</style>
