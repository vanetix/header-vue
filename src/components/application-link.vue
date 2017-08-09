<template>
  <a @dragstart="startDrag" draggable="true"
    :href="application.href">{{application.name}}</a>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'application-link',
  props: {
    application: Object,
    removable: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    ...mapActions(['removeUserApplication']),

    startDrag({ dataTransfer }) {
      if (this.removable) {
        this.removeUserApplication(this.application.id);
      } else {
        dataTransfer.setData('text/plain', this.application.id);
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import '~styles/variables';

a {
}
</style>
