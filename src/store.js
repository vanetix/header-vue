import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const lexSort = (value) => {
  return (a, b) => {
    const aValue = a[value].toLowerCase();
    const bValue = b[value].toLowerCase();

    return aValue < bValue ? -1 : 1;
  };
};

const state = {
  user: {
    name: "Billy Bob",
    role: "Super duper admin",
    avatar: "https://www.placecage.com/c/40/40"
  },
  application: {
    name: "Card Catalog",
    href: "https://card-catalog.in.creditcards.com"
  },

  applications: [],
  userApplications: []
};

const getters = {
  isLoaded({ applications }) {
    return applications.length > 0;
  }
};

const mutations = {
  setApplication(state, { name, href }) {
    state.application = {
      name,
      href
    };
  },

  setApplications(state, data) {
    state.applications = data.sort(lexSort('name'));
  },

  setUserApplications(state, data) {
    state.userApplications = data.sort(lexSort('name'));
  }
};

const actions = {
  addUserApplication({ commit, state }, data) {
    const applications = state.userApplications;
    const found = applications.some((a) => a.name === data.name);

    if (!found) {
      userApplications.push(data);
    }

    commit('setUserApplications', userApplications);
  },

  fetchApplications({ commit }) {
    axios.get("http://localhost:4000/clients").then(({ data }) => {
      commit('setApplications', data);
    }, (error) => {
      console.error(error);
    });
  },

  fetchUserApplications({ commit }) {
    axios.get("http://localhost:4000/me").then(({ data }) => {
      commit('setUserApplications', data);
    }, (error) => {
      console.error(error);
    });
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
