<template>
  <div class="home">
    <nav>
      <router-link to="/blogs">Blogs List</router-link> |
      <router-link to="/add">Add Bog</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "HomPage",
};
</script>
