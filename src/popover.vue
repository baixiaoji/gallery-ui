<template>
  <div class='popover' ref='popover'>
    <div class="content-wrapper" :class='contentWrapper' ref='contentWrapper' v-if='visible' @click.stop>
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
      trigger: {
        type: String,
        default: 'click',
        validator(val) {
          return ['click', 'hover'].indexOf(val) >= 0;
        }
      },
    },
    computed: {
      contentWrapper() {
        return {
          [`position-${this.position}`]: true,
        }
      },
    },
    mounted() {
      const {popover} = this.$refs;
      if (this.trigger === 'click') {
        popover.addEventListener('click',  this.onClickHandler);
      } else if (this.trigger === 'hover') {
        popover.addEventListener('mouseenter', this.open);
        popover.addEventListener('mouseleave', this.close);
      }
    },
    destroyed() {
      const {popover} = this.$refs;
      if (this.trigger === 'click') {
        popover.removeEventListener('click',  this.onClickHandler);
      } else if (this.trigger === 'hover') {
        popover.removeEventListener('mouseenter', this.open);
        popover.removeEventListener('mouseleave', this.close);
      }
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
    max-width: 20em;
    word-break: break-all;
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
        border-bottom: none;
      }
      &::after {
        top: calc(100% - 1px);
        border: 10px solid transparent;
        border-top-color: white;
        border-bottom: none;
      }
    }
    &.position-bottom {
      margin-top: 10px;
      
      &::before {
        bottom: 100%;
        border: 10px solid transparent;
        border-bottom-color: $border-color;
        border-top: none;
      }
      &::after {
        bottom: calc(100% - 1px);
        border: 10px solid transparent;
        border-bottom-color: white;
        border-top: none;
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
        border-right: none;
      }
      &::after {
        left: calc(100% - 1px);
        border: 10px solid transparent;
        border-left-color: white;
        border-right: none;
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
        border-left: none;
      }
      &::after {
        right: calc(100% - 1px);
        border: 10px solid transparent;
        border-right-color: white;
        border-left: none;
      }
    }
  }
</style>
