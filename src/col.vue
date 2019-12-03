<template>
  <div class='col' :class='[span && `col-${span}`, offset && `offset-${offset}`]'>
    <slot></slot>
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
  };
</script>

<style scoped lang='scss'>
  .col {
    height: 50px;
    width: 50%;
    background: lightgreen;
    border: 1px solid green;
    
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
