<template>
  <div class='g-slides'>
    <div class="g-slides-window">
      <div class="g-slides-wrapper">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GUI-Slide',
    props: {
      selected: {
        type: String,
      },
    },
    data() {
      return {};
    },
    mounted() {
      this.updateChildren();
    },
    updated() {
      this.updateChildren();
    },
    methods: {
      updateChildren() {
        const first = this.$children[0];
        const selected = this.selected || first.name;
        this.$children.forEach((vm) => {
          vm.selected = selected;
        })
      },
    },
  };
</script>

<style lang='scss' scoped>
  .g-slides{
    display: inline-block;
    &-window {
      overflow: hidden;
    }
    &-wrapper {
      position: relative;
    }
  }
</style>
