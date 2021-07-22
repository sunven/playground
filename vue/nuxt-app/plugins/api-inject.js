export default ({ $axios }, inject) => {
  // this.$login
  inject("login", user => {
    return $axios.$post("/api/login", user);
  });
};
