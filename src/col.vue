<template>
  <div class='col' :class='[span && `col-${span}`, offset && `offset-${offset}`]' :style='{paddingRight: `${gutter/2}px`, paddingLeft: `${gutter/2}px`}'>
    <div style='border:1px solid green;'>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GUI-Col',
    props: {
      span: {
        type: [String, Number]
      },
      offset: {
        type: [String, Number]
      }
    },
    data() {
      return {
        gutter: 0,
      };
    },
  };
</script>

<style scoped lang='scss'>
  .col {
    height: 50px;
    width: 50%;
    /*background: lightgreen;*/
    /*border: 1px solid green;*/
    
    $class-prefix: col-;
    
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: ($n/24) * 100%;
      }
    }
  
    $class-prefix: offset-;
  
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        margin-left: ($n/24) * 100%;
      }
    }
  }
</style>
