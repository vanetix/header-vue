import Vue from 'vue';
import Vuex from 'vuex';
import store from './store';
import DirectoryHeader from './DirectoryHeader.vue';

new Vue({
  store,
  el: '#directory-header',
  render: h => h(DirectoryHeader)
});
