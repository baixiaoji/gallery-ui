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
        const {top, left, height, width} = triggerWrapper.getBoundingClientRect();
        const {height: contentHeight} = contentWrapper.getBoundingClientRect();
        const positions = {
          top: {
            left: left + window.scrollX,
            top: top + window.scrollY
          },
          bottom: {
            left: left + window.scrollX,
            top: top + window.scrollY + height,
          },
          right: {
            left: left + width + window.scrollX,
            top: top + window.scrollY + (height - contentHeight)/2
          },
          left: {
            left: left + window.scrollX,
            top: top + window.scrollY + (height - contentHeight)/2
          },
        };
        contentWrapper.style.left = positions[this.position].left + 'px';
        contentWrapper.style.top = positions[this.position].top + 'px';
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
    filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.5));
    padding: 0.5em 1em;
    background: white;
    
    &::before, &::after {
      content: '';
      display: block;
      width: 0;
      height: 0;
      position: absolute;
    }
    
    &.position-top {
      transform: translateY(-100%);
      margin-top: -10px;
      
      &::before {
        top: 100%;
        border: 10px solid transparent;
        border-top-color: $border-color;
      }
      &::after {
        top: calc(100% - 1px);
        border: 10px solid transparent;
        border-top-color: white;
      }
    }
    &.position-bottom {
      margin-top: 10px;
    
      &::before {
        bottom: 100%;
        border: 10px solid transparent;
        border-bottom-color: $border-color;
      }
      &::after {
        bottom: calc(100% - 1px);
        border: 10px solid transparent;
        border-bottom-color: white;
      }
    }
  
    &.position-left {
      transform: translateX(-100%);
      margin-left: -10px;
      &::before, &::after {
        transform: translateY(-50%);
        top: 50%;
      }
      &::before {
        left: 100%;
        border: 10px solid transparent;
        border-left-color: $border-color;
      }
      &::after {
        left: calc(100% - 1px);
        border: 10px solid transparent;
        border-left-color: white;
      }
    }
    &.position-right {
      margin-left: 10px;
      &::before, &::after {
        transform: translateY(-50%);
        top: 50%;
      }
      &::before {
        right: 100%;
        border: 10px solid transparent;
        border-right-color: $border-color;
      }
      &::after {
        right: calc(100% - 1px);
        border: 10px solid transparent;
        border-right-color: white;
      }
    }
  }
</style>
