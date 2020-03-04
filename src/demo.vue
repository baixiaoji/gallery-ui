<template>
  <g-nav :selected.sync='selected'>
    <g-nav-item name='home'>首页</g-nav-item>
    <g-nav-item name='about'>关于我们</g-nav-item>
    <g-nav-sub>
      <template slot='title'>更多信息</template>
      <g-nav-item name='culture'>企业文化</g-nav-item>
      <g-nav-item name='art'>公司架构</g-nav-item>
    </g-nav-sub>

  </g-nav>
</template>

<script>
  import GNav from './nav/nav';
  import GNavItem from './nav/nav-item';
  import GNavSub from './nav/nav-sub';
  
  
  export default {
    components: {
      GNav,
      GNavItem,
      GNavSub,
    },
    data() {
      return {
        selected: ['home'],
      }
    },
    mounted() {
    },
  };
</script>

<style lang='scss'>
  * {margin: 0; padding: 0; box-sizing: border-box;}
  .box {
    display: flex;
    justify-content: center;
    align-content: center;
    font-size: 8em;
    height: 150px;
    background-color: #ddd;
  }
  :root {
    --button-height: 32px;
    --font-size: 14px;
  }
  
  body {
    font-size: var(--font-size);
    padding: 100px;
    border: 1px solid black;
  }
</style>
