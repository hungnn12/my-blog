<template>
  <div class="">
    <form @submit.prevent="handleSubmit">
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Title</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            v-model="blog.title"
            :class="{ 'is-invalid': submitted && $v.blog.title.$error }"
          />
          <div
            v-if="submitted && !$v.blog.title.required"
            class="invalid-feedback"
          >
            Title is required
          </div>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Content</label>
        <div class="col-sm-10">
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            v-model="blog.content"
            rows="3"
            :class="{ 'is-invalid': submitted && $v.blog.content.$error }"
          ></textarea>
          <div
            v-if="submitted && !$v.blog.content.required"
            class="invalid-feedback"
          >
            Content is required
          </div>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Image</label>
        <div class="col-sm-10">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroupFileAddon01"
                >Upload</span
              >
            </div>
            <div class="custom-file">
              <input
                type="file"
                class="custom-file-input"
                id="inputGroupFile01"
                aria-describedby="inputGroupFileAddon01"
                @change="onFileChange($event)"
              />
              <label class="custom-file-label" for="inputGroupFile01">
                {{ !fileImage ? "Choose file" : fileImage.name || fileImage }}
              </label>
            </div>
          </div>
          <div class="invalid-feedback d-block" v-if="fileError">
            {{ fileError }}
          </div>
        </div>
      </div>
      <div class="form-group">
        <button type="button" class="btn btn-default" @click="gotoHome">
          Cancel
        </button>
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
    <div class="alert alert-success" v-if="isSuccess">
      <strong v-if="!blogId">Added Blog Success!</strong>
      <strong v-else>Edited Blog Success!</strong>
    </div>
  </div>
</template>
<script>
import BlogService from "@/services/blog.service";
import { required } from "vuelidate/lib/validators";
import Vue from "vue";
export default Vue.extend({
  name: "BlogFormComponent",
  data() {
    return {
      httpRequest: new BlogService(this.$store),
      blog: {
        title: "",
        content: "",
      },
      fileImage: "",
      submitted: false,
      fileError: "",
      isSuccess: false,
      blogId: null,
    };
  },
  validations: {
    blog: {
      title: { required },
      content: { required },
    },
  },
  mounted() {
    this.blogId = this.$route?.params?.id;
    if (this.blogId) {
      this.getBlogDetail();
    }
  },
  methods: {
    async getBlogDetail() {
      let endpoint = `${this.appConfig.apiUrl}${this.appConfig.api.blogs}/${this.blogId}`;
      let { data, error } = await this.httpRequest.get(endpoint);
      if (error) {
        return;
      }
      if (data && data.data) {
        this.blog = {
          title: data.data.title,
          content: data.data.content,
        };
        this.fileImage = data.data.image.url;
      }
    },
    async handleSubmit() {
      this.submitted = true;
      this.isSuccess = false;
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid || this.fileError) {
        return;
      }
      const params = {
        ...this.blog,
        image: this.fileImage,
      };
      // for edit
      let response = {
        data: {},
        error: {},
      };
      if (this.blogId) {
        const endpoint = `${this.appConfig.apiUrl}${this.appConfig.api.blogs}/${this.blogId}`;
        response = await this.httpRequest.put(endpoint, params);
      } else {
        const endpoint = `${this.appConfig.apiUrl}${this.appConfig.api.blogs}`;
        response = await this.httpRequest.post(endpoint, params);
      }

      if (response.error) {
        return;
      }
      if (response.data && response.data.data) {
        this.isSuccess = true;
      }
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      if (
        file["type"].toLowerCase() !== "image/png" &&
        file["type"].toLowerCase() !== "image/jpg" &&
        file["type"].toLowerCase() !== "image/jpeg"
      ) {
        this.fileError = "Filetype not supported";
        // this.form.avatar = null;
        return;
      }
      this.fileError = "";
      this.fileImage = file;
    },
    gotoHome() {
      this.$router.push("/blogs");
    },
  },
});
</script>

<style lang="scss" scoped>
@import "./BlogFormComponentStyle.scss";
</style>
