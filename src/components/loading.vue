<template>
  <div class="loading">
    <i></i>
    <i></i>
    <i></i>
    <i></i>
    <i></i>
    <i></i>
  </div>
</template>

<script>
export default {
  name: 'loading'
};
</script>

<style scoped lang="scss">
@import '~styles/variables';

.loading {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;

  i:nth-child(1) { animation: loading 2s infinite ease-in-out; }
  i:nth-child(2) { animation: loading 2s 200ms infinite ease-in-out; }
  i:nth-child(3) { animation: loading 2s 400ms infinite ease-in-out; }
  i:nth-child(4) { animation: loading 2s 600ms infinite ease-in-out; }
  i:nth-child(5) { animation: loading 2s 800ms infinite ease-in-out; }
  i:nth-child(6) { animation: loading 2s 1000ms infinite ease-in-out; }

  i {
    display: block;
    margin: 0 0.2rem 0 0;
    padding: 0;
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    opacity: 0;
    background: $white;
    box-shadow: 0 0 1px $black;
  }

  @keyframes loading {
    0%, 100% {
      opacity: 0;
      transform: scale(0);
    }

    50% {
      opacity: 1;
      transform: scale(1);
    }
  }
}
</style>
