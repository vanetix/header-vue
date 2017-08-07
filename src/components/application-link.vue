<template>
  <a :href="application.href">{{application.name}}</a>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'application-link',
  props: {
    application: Object
  }
};
</script>

<style scoped lang="scss">
@import '~styles/variables';

a {
}
</style>
