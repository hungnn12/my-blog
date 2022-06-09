<template>
  <div id="app" class="container">
    <img alt="Vue logo" src="./assets/logo.png" />
    <LoadingComponent v-if="isLoading" />
    <router-view />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import LoadingComponent from "./components/partials/loading/LoadingComponent.vue";
export default {
  components: {
    LoadingComponent,
  },
  computed: {
    ...mapGetters({
      isLoading: "getLoading",
    }),
  },
};
</script>

<style></style>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
