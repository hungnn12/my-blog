<template>
  <div class="blog-single">
    <div class="w-100">
      <article class="article" v-if="blogDetail">
        <div class="article-title">
          <h6><a @click="gotoHome" class="cursor-pointer">My Blogs</a></h6>
          <h2>{{ blogDetail.title }}</h2>
        </div>
        <div class="article-img">
          <img :src="blogDetail.image.url" title="" alt="" />
        </div>
        <div class="article-content">
          <p>
            {{ blogDetail.content }}
          </p>
        </div>
      </article>
      <div v-else>No content found</div>
    </div>
  </div>
</template>
<script>
import BlogService from "@/services/blog.service";
// import { SET_LOADING_MUTATION } from "../store/loading/loading.constant.ts";
export default {
  name: "BlogDetailComponent",
  data() {
    return {
      httpRequest: new BlogService(this.$store),
      blogDetail: null,
      blogId: null,
    };
  },
  mounted() {
    this.blogId = this.$route?.params?.id;
    this.getBlogDetail();
  },
  methods: {
    async getBlogDetail() {
      let endpoint = `${this.appConfig.apiUrl}${this.appConfig.api.blogs}/${this.blogId}`;
      let { data, error } = await this.httpRequest.get(endpoint);
      if (error) {
        return;
      }
      if (data && data.data) {
        this.blogDetail = data.data;
      }
    },
    gotoHome() {
      this.$router.push("/blogs");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./BlogDetailComponentStyle.scss";
</style>
