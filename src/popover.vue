<template>
  <div class='popover' ref='popover' @click.stop='onClickHandler'>
    <div class="content-wrapper" ref='contentWrapper' v-show='visible' @click.stop>
      <slot name='content'></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'GUI-Popover',
    data() {
      return {
        visible: false,
      };
    },
    methods: {
      onClickHandler() {
        this.visible = !this.visible;
        if (this.visible) {
          document.body.append(this.$refs.contentWrapper);
          const {top, left} = this.$refs.popover.getBoundingClientRect();
          this.$refs.contentWrapper.style.left = left + window.scrollX + 'px';
          this.$refs.contentWrapper.style.top = top + window.scrollY + 'px';
          const documentListener = () => {
            this.visible = false;
            document.removeEventListener('click', documentListener);
          };
          this.$nextTick(() => {
            document.addEventListener('click', documentListener);
          });
        }
      },
    },
  };
</script>

<style scoped lang='scss'>
  .popover {
    position: relative;
  }
  .content-wrapper {
    position: absolute;
    border: 1px solid red;
    transform: translateY(-100%);
  }
</style>
