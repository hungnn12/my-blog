<template>
  <div>
    <template v-if="blogList.length > 0">
      <ul class="list-unstyled">
        <li
          class="media cursor-pointer"
          :class="{ 'my-4': index !== 0 || index === blogList.length }"
          v-for="(item, index) in blogList"
          :key="index"
        >
          <img
            :src="item.image.url"
            class="mr-3"
            width="64"
            height="64"
            @click="gotoBlogDetail(item)"
          />
          <div class="media-body text-left" @click="gotoBlogDetail(item)">
            <h5 class="mt-0 mb-1">{{ item.title }}</h5>
            {{ item.content }}
          </div>
          <img src="../../assets/pen.svg" @click="gotoEditBlog(item)" />
        </li>
      </ul>
      <PaginationComponent
        :totalPage="pagination.total"
        @handleChangePage="handleChangePage"
      />
    </template>
    <template v-else>
      <div>No record</div>
    </template>
  </div>
</template>
<script>
import BlogService from "@/services/blog.service";
import PaginationComponent from "../partials/pagination/PaginationComponent.vue";
export default {
  name: "BlogsListComponent",
  components: {
    PaginationComponent,
  },
  data() {
    return {
      httpRequest: new BlogService(this.$store),
      blogList: [],
      pagination: {
        page: 1,
        offset: 10,
        total: 1,
      },
    };
  },
  mounted() {
    this.getBlogList();
  },
  methods: {
    async getBlogList() {
      let endpoint = `${this.appConfig.apiUrl}${this.appConfig.api.blogs}?page=${this.pagination.page}&offset=${this.pagination.offset}`;
      let { data, error } = await this.httpRequest.get(endpoint);

      if (error) {
        return;
      }
      if (data && data.data) {
        this.blogList = data.data?.items;
        this.pagination = data.pagination;
      }
    },
    gotoBlogDetail(item) {
      this.$router.push(`/blog/detail/${item.id}`);
    },
    handleChangePage(page) {
      this.pagination.page = page;
      this.getBlogList();
    },
    gotoEditBlog(item) {
      this.$router.push(`/blog/edit/${item.id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./BlogsListComponentStyle.scss";
</style>
