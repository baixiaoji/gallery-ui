<template>
  <div class='popover' ref='popover' @click='onClickHandler'>
    <div class="content-wrapper" :class='contentWrapper' ref='contentWrapper' v-show='visible' @click.stop>
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
    props: {
      position: {
        type: String,
        default: 'top',
        validator(val) {
          return ['top', 'bottom', 'right', 'left'].indexOf(val) >= 0;
        },
      },
    },
    computed: {
      contentWrapper() {
        return {
          [`position-${this.position}`]: true,
        }
      },
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
    &.position-top {
      transform: translateY(-100%);
      margin-top: -10px;
      
      &::before {
        content: '';
        display: block;
        width: 0;
        height: 0;
        position: absolute;
        top: 100%;
        border: 10px solid transparent;
        border-top-color: $border-color;
      }
  
      &::after {
        content: '';
        display: block;
        width: 0;
        height: 0;
        position: absolute;
        top: calc(100% - 1px);
        border: 10px solid transparent;
        border-top-color: white;
      }
    }
  }
</style>
