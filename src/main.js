import Vue from 'vue';
import Vuex from 'vuex';
import App from './DirectoryHeader.vue';
import store from './store';

new Vue({
  store,
  el: '#directory-header',
  render: h => h(App)
});
