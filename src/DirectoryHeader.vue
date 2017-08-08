<docs>
### Directory Header

Main component for rendering out the header to the page.
</docs>

<template>
  <div class="directory-header">
    <div class="directory-header__left">
      <ul class="directory-header__menu">
        <li class="directory-header__title">
          <a :href="application.href">{{application.name}}</a>
        </li>

        <li>
          <dropdown :items="applications">
            <template>
              <span v-if="isLoaded" class="directory-header__application-dropdown">Applications</span>
              <loading v-else></loading>
            </template>

            <template slot="item" scope="props">
              <application-link :application="props.item"></application-link>
            </template>
          </dropdown>
        </li>

        <li v-for="a in displayedUserApplications">
          <application-link :application="a"></application-link>
        </li>
      </ul>
    </div>

    <div class="directory-header__right">
      <ul class="directory-header__menu">
        <li>
          <dropdown :items="dropdownItems">
            <template>
              <span class="directory-header__name">{{user.name}}</span>
              <span class="directory-header__role">{{user.role}}</span>
            </template>
          </dropdown>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
import ApplicationLink from './components/application-link.vue';
import Dropdown from './components/dropdown.vue';
import Loading from './components/loading.vue';

export default {
  name: 'directory-header',

  components: {
    'dropdown': Dropdown,
    'loading': Loading,
    'application-link': ApplicationLink
  },

  data() {
    return {
      dropdownItems: [
        {
          name: "Back to Directory",
          href: "https://www.google.com"
        },
        {
          name: "Logout",
          href: "https://www.google.com"
        }
      ]
    };
  },

  methods: {
    ...mapMutations(['setApplication']),

    ...mapActions(['addUserApplication',
      'fetchApplications', 'fetchUserApplications']),

    configure(data) {
      console.log(data);

      this.setApplication(data.application);
    }
  },

  computed: {
    ...mapGetters(['isLoaded', 'getUserApplications']),
    ...mapState(['user', 'application', 'applications']),

    displayedUserApplications() {
      const currentApplication = this.application.name;

      return this.getUserApplications.filter(({ name }) => {
        return name !== currentApplication;
      });
    },

    logoutUrl() {
      return "https://www.google.com";
    }
  },

  beforeMount() {
    this.fetchApplications();
    this.fetchUserApplications();
  },

  created() {
    const { configure } = this;

    window.HEADER = {
      configure
    };
  }
};
</script>

<style scoped lang="scss">
@import '~styles/variables';

.directory-header {
  display: flex;
  color: $white;
  background: $blue;
  font-size: 1rem;
  font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;

  & &__title {
    margin-right: 1rem;
  }

  &__left,
  &__right {
    display: flex;
    width: 50%;
  }

  &__right { justify-content: flex-end; }

  &__name,
  &__role { display: block; }

  &__name {
    margin-bottom: 0.2rem;
  }

  &__role {
    color: darken($white, 8%);
    font-size: 0.6em;
  }

  &__menu {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: stretch;
    align-content: center;

    li {
      display: flex;
      flex: 0 0 auto;
      align-items: stretch;
      justify-content: center;
      flex-direction: column;
      margin: 0;
    }
  }

  a {
    display: block;
    color: $link;
    padding: 1rem 0.6rem;
    font-weight: 600;
    text-decoration: none;

    &:focus { outline: none; }

    &:hover { color: $link-hover; }
  }
}
</style>
