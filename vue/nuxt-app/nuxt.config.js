export default {
  router: {
    extendRouters(routes, resolve) {
      routes.push({
        path: "/foo",
        component: resolve(__dirname, "pages/foo.vue")
      });
    }
    //middleware: ["auth"]
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "nuxt-app",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/element-ui",
    "@/plugins/api-inject",
    "@/plugins/interceptor"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "cookie-universal-nuxt"],

  axios: {
    proxy: true
  },
  proxy: {
    "/api": "http://localhost:8080"
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
};
