<template>
    <g-slides :selected.sync='selected'>
      <g-slide-item name='1'>
        <div class="box">1</div>
      </g-slide-item>
      <g-slide-item name='hi'>
        <div class="box">2</div>
      </g-slide-item>
      <g-slide-item name='world'>
        <div class="box">3</div>
      </g-slide-item>
    </g-slides>
</template>

<script>
  import GSlides from './slides/slides';
  import GSlideItem from './slides/slide-item';
  export default {
    components: {
      GSlides,
      GSlideItem,
    },
    data() {
      return {
        selected: '1',
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
