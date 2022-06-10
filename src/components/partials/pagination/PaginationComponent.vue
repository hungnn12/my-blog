<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: page === 1 }">
          <a
            class="page-link"
            @click="handleChangePage(page - 1)"
            aria-disabled="true"
            >Previous</a
          >
        </li>
        <li
          class="page-item"
          :class="{ active: page === index }"
          v-for="index in totalPage"
          :key="index"
        >
          <a class="page-link" @click="handleChangePage(index)">{{ index }}</a>
        </li>
        <li class="page-item" :class="{ disabled: page === totalPage }">
          <a class="page-link" @click="handleChangePage(page + 1)">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "PaginationComponent",
  props: {
    totalPage: {
      type: Number,
      default: 10,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      page: 1,
    };
  },
  watch: {
    currentPage(value) {
      this.page = value;
    },
  },
  methods: {
    handleChangePage(page) {
      this.page = page;
      window.scrollTo(0, 0);
      this.$emit("handleChangePage", page);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./PaginationComponentStyle.scss";
</style>
