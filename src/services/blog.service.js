import Vue from "vue";
import { SET_LOADING_MUTATION } from "../store/loading/loading.constant";
export default class BlogService {
  constructor(store) {
    this.$store = store;
  }
  async get(url) {
    this.$store.commit(SET_LOADING_MUTATION, true);
    return Vue.axios
      .get(`${url}`)
      .then((res) => {
        setTimeout(() => {
          this.$store.commit(SET_LOADING_MUTATION, false);
        }, 100);
        return {
          data: {
            ...res.data,
          },
        };
      })
      .catch((error) => {
        this.$store.commit(SET_LOADING_MUTATION, false);
        return this.handleError(error);
      });
  }
  async post(url, params) {
    this.$store.commit(SET_LOADING_MUTATION, true);
    const formData = new FormData();
    Object.keys(params).forEach((k) => {
      formData.append(`blog[${k}]`, params[k]);
    });
    params = formData;
    return Vue.axios
      .post(`${url}`, params)
      .then((res) => {
        this.$store.commit(SET_LOADING_MUTATION, false);
        return {
          data: {
            ...res.data,
          },
        };
      })
      .catch((error) => {
        this.$store.commit(SET_LOADING_MUTATION, false);
        return this.handleError(error);
      });
  }

  async put(url, params) {
    this.$store.commit(SET_LOADING_MUTATION, true);
    const formData = new FormData();
    Object.keys(params).forEach((k) => {
      formData.append(`blog[${k}]`, params[k]);
    });
    params = formData;
    return Vue.axios
      .put(`${url}`, params)
      .then((res) => {
        this.$store.commit(SET_LOADING_MUTATION, false);
        return {
          data: {
            ...res.data,
          },
        };
      })
      .catch((error) => {
        this.$store.commit(SET_LOADING_MUTATION, false);
        return this.handleError(error);
      });
  }

  handleError(error) {
    // this is function handle for error
    console.log("error", error);
  }
}
