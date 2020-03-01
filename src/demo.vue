<template>
    <g-slides :selected='selected'>
      <g-slide-item name='1'>
        <div class="box">1</div>
      </g-slide-item>
      <g-slide-item name='2'>
        <div class="box">2</div>
      </g-slide-item>
      <g-slide-item name='3'>
        <div class="box">3</div>
      </g-slide-item>
    </g-slides>
</template>

<script>
  import GSlides from './slides';
  import GSlideItem from './slide-item';
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
      let n = 1;
      setInterval(() => {
        if (n>3) {n=1}
        this.selected = n.toString();
        n++;
      }, 1500)
    },
  };
</script>

<style lang='scss'>
  * {margin: 0; padding: 0; box-sizing: border-box;}
  .box {
    width: 200px;
    height: 150px;
    background-color: #ddd;
    border: 1px solid red;
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
