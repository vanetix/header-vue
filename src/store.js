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
  },

  /**
   * TODO: Convert applications to a map for fast access
   *
   * @param {Object} state
   */
  getUserApplications({ userApplications, applications }) {
    return applications.filter(({ id }) => {
      return userApplications.some(({ clientId }) => clientId === id);
    });
  }
};

const mutations = {
  setApplication(state, { name, href }) {
    state.application = {
      name,
      href
    };
  },

  /**
   * Takes an Object which represents a raw response from the API,
   * and commits it into the store.
   *
   * Example `data`:
   *
   * {
   *   type: "client",
   *   id: "client_id",
   *   attributes: {
   *     name: "Client",
   *     href: "https://client.com"
   *   }
   * }
   *
   * @param {Object} state
   * @param {Object} data
   */
  setApplications(state, { data }) {
    const applications = data.map((application) => {
      const { id, attributes: { name, href } } = application;

      return {
        id,
        name,
        href
      };
    });

    state.applications = applications.sort(lexSort('name'));
  },

  /**
   * Takes an Object which represents a raw response from the API,
   * and commits it into the store.
   *
   * Example `data`:
   *
   * {
   *   type: "user-client",
   *   id: "1",
   *   attributes: {
   *     user_id: "Client",
   *     client_id: "https://client.com"
   *   }
   * }
   *
   * @param {Object} state
   * @param {Object} data
   */
  setUserApplications(state, { data }) {
    state.userApplications = data.map((application) => {
      const { id, attributes } = application;

      return {
        id,
        userId: attributes['user-id'],
        clientId: attributes['client-id']
      };
    });
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

  fetchApplications({ commit, state }) {
    const { token } = state.user;

    axios.get("http://localhost:4000/clients", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(({ data }) => {
      commit('setApplications', data);
    }, (error) => {
      console.error(error);
    });
  },

  fetchUserApplications({ commit, state }) {
    const { token } = state.user;

    axios.get("http://localhost:4000/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(({ data }) => {
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
