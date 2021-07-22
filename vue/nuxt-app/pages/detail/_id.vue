<template>
  <div>
    <pre v-if="goodInfo">
      {{ goodInfo }}
    </pre>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params, error }) {
    if (params.id) {
      const { data: goodInfo } = await $axios.$get("/api/detail", { params });
      if (goodInfo) {
        return { goodInfo };
      } else {
        error({ statusCode: 500, message: "查询失败" });
      }
    } else {
      return { goodInfo: null };
    }
  }
};
</script>

<style lang="scss" scoped></style>
