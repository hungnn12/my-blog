<template>
  <div class="home">
    <blogs-list-component></blogs-list-component>
  </div>
</template>

<script>
import BlogsListComponent from "@/components/blogs-list/BlogsListComponent.vue";
export default {
  name: "BlogListPage",
  components: {
    BlogsListComponent,
  },
};
</script>
