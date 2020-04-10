<template>
  <div id="app">
    <h1>{{mainTitle}}</h1>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mainTitle: "这里是利朗达！"
    };
  },
  created() {},
  mounted() {}
};
</script>

<style lang="stylus">
  #app {
      h1 {
          font-size: 25px;
      }
  }
</style>
