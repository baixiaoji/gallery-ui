<template>
  <div class="toast-wrapper" :class='toastClasses'>
    <div class="toast">
      <div class="message">
        <slot v-if='!enableHtml'></slot>
        <div v-else v-html='$slots.default[0]'></div>
      </div>
      <template v-if='closeButton && closeButton.text'>
        <div class="line"></div>
        <span class='close' @click='onClickClose'>
          {{ closeButton.text }}
        </span>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GUI-Toast',
    props: {
      autoClose: {
        type: [Boolean, Number],
        default: 3000,
        validator(value) {
          return value === false || typeof value === 'number';
        }
      },
      closeButton: {
        type: Object,
      },
      enableHtml: {
        type: Boolean,
        default: false,
      },
      position: {
        type: String,
        default: 'top',
        validator(val) {
          return ['top', 'middle', 'bottom'].indexOf(val) >= 0;
        },
      },
    },
    mounted() {
      this.checkAutoClose();
    },
    computed: {
      toastClasses() {
        return {
          [`toast-position-${ this.position }`]: true,
        };
      },
    },
    methods: {
      checkAutoClose() {
        if (this.autoClose) {
          setTimeout(() => {
            this.close();
          }, this.autoClose);
        }
      },
      close() {
        this.$el.remove();
        this.$emit('close');
        this.$destroy();
      },
      onClickClose() {
        this.close();
        if (this.closeButton && typeof this.closeButton.callback === 'function') {
          this.closeButton.callback();
        }
      },
    },
  };
</script>

<style lang='scss'>
  $Toast-min-height: 40px;
  $Toast-bg: rgba(0, 0, 0, 0.75);
  
  @keyframes fade-in {
    0% {opacity: 0}
    100% {opacity: 1}
  }
  
  @keyframes slide-down {
    0% {opacity: 0; transform: translateY(-100%)}
    100% {opacity: 1; transform: translateY(0%)}
  }

  @keyframes slide-up {
    0% {opacity: 0; transform: translateY(100%)}
    100% {opacity: 1; transform: translateY(0%)}
  }
  
  .toast-wrapper {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    $animation-duration: 300ms;
    &.toast-position-top {
      top: 0;
      .toast {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        animation: slide-down $animation-duration;
      }
    }
    &.toast-position-middle {
      top: 50%;
      transform: translate(-50%, -50%);
      .toast {
        animation: fade-in $animation-duration;
      }
    }
    &.toast-position-bottom {
      bottom: 0;
      .toast {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        animation: slide-up $animation-duration;
      }
    }
  }
  .toast {
    display: flex;
    align-items: center;
    color: white;
    font-size: 14px;
    line-height: 1.8;
    min-height: $Toast-min-height;
    padding: 0 16px;
    background: $Toast-bg;
    border-radius: 4px;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.50);
    
    .message {
      padding: 8px 0;
    }
    
    .close {
      padding-left: 16px;
      cursor: pointer;
      flex-shrink: 0;
    }
    
    .line {
      border-left: 1px solid #666;
      margin-left: 16px;
      align-self: stretch;
    }
  }
</style>
