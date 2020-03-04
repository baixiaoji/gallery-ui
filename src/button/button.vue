<template>
  <button class="g-button" :class='{[`icon-${iconPosition}`]: true}' @click='$emit("click")'>
    <gallery-icon  v-if='icon && !loading'  class='icon' :name='icon'></gallery-icon>
    <gallery-icon v-if='loading' class="loading icon" name="loading"></gallery-icon>
    <div class="g-button-content">
      <slot></slot>
    </div>
  </button>
</template>

<script>
  import icon from '../icon';
  export default {
    name: 'gallery-button',
    components: {
      'gallery-icon': icon,
    },
    props: {
      icon: {type: String},
      iconPosition: {
        type: String,
        default: 'left',
        validator(val) {
          return val === 'left' || val === 'right';
        },
      },
      loading: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>

<style lang='scss'>
  @import "../var";
  
  .g-button {
    font-size: $font-size;
    height: $button-height;
    padding: 0 1em;
    border-radius: $border-radius;
    border: 1px solid $border-color;
    background: var(--button-bg);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    cursor: pointer;
    
    &:hover {
      border-color: $border-color-hover;
    }
    
    &:active {
      background-color: $button-active-bg;
    }
    
    &:focus {
      outline: none
    }
    
    > .g-button-content { order: 2; }
    
    > .icon { order: 1; margin-right: .1em; }
    
    &.icon-right {
      > .g-button-content { order: 1; }
      
      > .icon { order: 2; margin-right: 0; margin-left: .1em; }
    }
    .loading{
      animation: spin 2s infinite linear;
    }
  }
</style>
