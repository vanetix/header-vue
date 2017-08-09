import Vue from 'vue';
import { mapActions } from 'vuex';
import store from './store';
import DirectoryHeader from './DirectoryHeader.vue';

window.initializeHeader = (configuration = {}) => {
  const el = configuration.el || '#directory-header';

  store.dispatch('initialize', configuration);

  return new Vue({
    el,
    store,
    render: h => h(DirectoryHeader)
  });
}
