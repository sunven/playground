<template>
  <!-- <Tutorial /> -->
  <div>
    <h2>商品列表</h2>
    <ul>
      <li v-for="good in goods" :key="good.id">
        <nuxt-link :to="`/detail/${good.id}`">
          <span>{{ good.text }}</span>
          <span>${{ good.price }}</span>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "商品列表",
      meta: [{ name: "description", hid: "description", content: "sss" }],
      link: [{ rel: "", href: "" }]
    };
  },
  data() {
    return {
      goods: []
    };
  },
  async asyncData({ $axios, error }) {
    const { ok, goods } = await $axios.$get("/api/goods");
    if (ok) {
      // 此处返回的数据会和data合并;
      return { goods };
    }
    error({ statusCode: 400, message: "数据查询失败" });
  }
};
</script>
