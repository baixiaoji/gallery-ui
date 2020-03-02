<template>
  <div class='g-slides'>
    <div class="g-slides-window">
      <div class="g-slides-wrapper">
        <slot/>
      </div>
    </div>
    <div class='g-slides-dots'>
      <span v-for='n in childrenLength' @click='select(n-1)'
            :class='{active: selectedIndex === n -1}'>
        {{ n - 1 }}
      </span>
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
      autoPlay: {
        type: Boolean,
      },
    },
    data() {
      return {
        childrenLength: 0,
        lastSelectedIndex: undefined,
      };
    },
    computed: {
      names() {
        return this.$children.map(vm => vm.name);
      },
      selectedIndex() {
        return this.names.indexOf(this.selected);
      },
    },
    mounted() {
      this.updateChildren();
      this.playAutomatically();
      this.childrenLength = this.$children.length;
      this.lastSelectedIndex = this.selectedIndex;
    },
    updated() {
      this.updateChildren();
    },
    methods: {
      playAutomatically() {
        const run = () => {
          const index = this.names.indexOf(this.selected);
          let newIndex = index + 1;
          if (newIndex === this.names.length) {
            newIndex = 0
          }
          if (newIndex === -1) {
            newIndex = this.names.length - 1;
          }
          this.select(newIndex);
          setTimeout(() => {
            run();
          }, 3000)
        };
        
        setTimeout(() => {
          run();
        }, 3000)
      },
      select(index) {
        this.lastSelectedIndex = this.selectedIndex;
        this.$emit('update:selected', this.names[index]);
      },
      getSelected() {
        const first = this.$children[0];
        return this.selected || first.name;
      },
      updateChildren() {
        const selected = this.getSelected();
        this.$children.forEach((vm) => {
          vm.selected = selected;
          vm.reverse = this.lastSelectedIndex > this.selectedIndex ? true : false;
        });
      },
    },
  };
</script>

<style lang='scss' scoped>
  .g-slides {
    
    &-window {
      overflow: hidden;
    }
    
    &-wrapper {
      position: relative;
    }
    
    &-dots {
      > span {
        &.active {
          background: red;
        }
      }
    }
  }
</style>
