<template>
  <transition name='slide' mode='out-in'>
    <div class='g-slide-item' v-if='visible'>
      <slot/>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'GUI-Slide-Item',
    props: {
      name: {
        type: String,
        required: true,
      }
    },
    data() {
      return {
        selected: '',
      }
    },
    computed: {
      visible() {
        return this.selected === this.name;
      },
    },
  };
</script>

<style lang='scss' scoped>
  .slide-leave-active {
    position: absolute;
    left: 0; top: 0;
    width: 100%;
    height: 100%;
  }
  .slide-enter-active, .slide-leave-active {
    transition: all 1s;
  }
  .slide-enter {
    transform: translateX(100%);
  }
  .slide-leave-to {
    transform: translateX(-100%);
  }
</style>
