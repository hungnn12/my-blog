import Vue from "vue";
import Vuex from "vuex";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import getters from "./loading/getters";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import mutations from "./loading/mutations";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import state from "./loading/state";
Vue.use(Vuex);

export default new Vuex.Store({
  state: state,
  getters,
  mutations,
  actions: {},
  modules: {},
});
