<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
    import Vue from 'vue';

    import Element from 'element-ui';
    
 Vue.use(Element);
export default {
  data() {
    return {
      mainTitle: "这里是利朗达！"
    };
  },
  created() {
      this.$router.push('/login');
  },
  mounted() {}
};
</script>

<style lang="stylus">
@import url('../theme/index.css');
@import url('./scss/global.styl');
@import url('./scss/el-pack.styl');
@import ('./scss/var.styl');

html, body, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  position: relative;
  min-width: $site-width;
}

#app {
  h1 {
    font-size: 25px;
  }

  .header {
    width: 100%;
    height: 60px;
  }

  .left-menu {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .nav-tabs {
    /* background-color:rgba(176,206,134,.5) ; */
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
  }

  .footer {
    height: 30px;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    overflow: hidden;
    line-height: 30px;
    background-color: #324057;
  }
}
</style>
