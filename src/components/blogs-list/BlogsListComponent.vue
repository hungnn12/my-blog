<template>
  <div>
    <div class="input-group mb-3">
      <div class="input-group-prepend mb-3">
        <div class="sort-by mr-3">
          <label for="sel1" class="form-label mr-1">Sort by</label>
          <select
            class="form-select form-control"
            id="sel1"
            name="sellist1"
            v-model="sortBy"
            @change="handleBySort()"
          >
            <option
              v-for="(item, index) in sortOptions"
              :key="index"
              :value="item.value"
            >
              {{ item.label }}
            </option>
          </select>
        </div>
      </div>
      <input
        type="text"
        class="form-control"
        aria-label="Search"
        v-model="searchQueries"
        placeholder="Please enter to search"
        @keydown.enter.prevent="handleSearch"
      />
    </div>
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
        :currentPage="pagination.page"
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
      sortOptions: [
        {
          label: "Title",
          value: "title",
        },
        {
          label: "Content",
          value: "content",
        },
        {
          label: "Create at",
          value: "created_at",
        },
        {
          label: "Update at",
          value: "updated_at",
        },
      ],
      searchQueries: "",
      sortBy: "created_at",
    };
  },
  mounted() {
    this.getBlogList();
  },
  methods: {
    async getBlogList() {
      let query = `page=${this.pagination.page}&offset=${this.pagination.offset}`;
      if (this.sortBy) {
        query += `&sort_by=${this.sortBy}&sort_direction=${
          this.sortBy == "created_at" ? "desc" : "asc"
        }`;
      }
      if (this.searchQueries) {
        query += `&search=${this.searchQueries}`;
      }
      let endpoint = `${this.appConfig.apiUrl}${this.appConfig.api.blogs}?${query}`;
      let { data, error } = await this.httpRequest.get(endpoint);

      if (error) {
        return;
      }
      if (data && data.data) {
        this.blogList = data.data?.items;
        this.pagination = data.pagination;
      }
    },
    handleBySort() {
      this.pagination.page = 1;
      this.getBlogList();
    },
    handleSearch() {
      this.pagination.page = 1;
      this.getBlogList();
    },
    handleChangePage(page) {
      this.pagination.page = page;
      this.getBlogList();
    },
    gotoBlogDetail(item) {
      this.$router.push(`/blog/detail/${item.id}`);
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
