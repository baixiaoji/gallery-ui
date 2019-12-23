<template>
  <div class='popover' ref='popover' @click='onClickHandler'>
    <div class="content-wrapper" ref='contentWrapper' v-show='visible' @click.stop>
      <slot name='content'></slot>
    </div>
    <span ref='triggerWrapper' class='trigger-wrapper'>
      <slot></slot>
    </span>
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
      positionContentWrapper() {
        const {contentWrapper, triggerWrapper} = this.$refs;
        document.body.append(contentWrapper);
        const {top, left} = triggerWrapper.getBoundingClientRect();
        contentWrapper.style.left = left + window.scrollX + 'px';
        contentWrapper.style.top = top + window.scrollY + 'px';
      },
      documentListener(e) {
        if (this.$refs.popover && (this.$refs.popover === e.target || this.$refs.popover.contains(e.target))) {
          return;
        }
        this.close()
      },
      open() {
        this.visible = true;
        this.$nextTick(() => {
          this.positionContentWrapper();
          document.addEventListener('click', this.documentListener);
        });
      },
      close() {
        this.visible = false;
        document.removeEventListener('click', this.documentListener);
      },
      onClickHandler(event) {
        if (this.$refs.triggerWrapper.contains(event.target)) {
          if (this.visible) {
            this.close();
          } else {
            this.open();
          }
        }
      },
    },
  };
</script>

<style scoped lang='scss'>
  $border-color: #333;
  $border-radius: 4px;
  .popover {
    display: inline-block;
    
    .trigger-wrapper {
      display: inline-block;
    }
  }
  
  .content-wrapper {
    position: absolute;
    border: 1px solid $border-color;
    border-radius: $border-radius;
    box-shadow: 0 0 1px rgba(0,0,0,.3);
    padding: 0.5em 1em;
    transform: translateY(-100%);
  }
</style>
