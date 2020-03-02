<template>
  <div class='g-slides' @mouseenter='onMouseEnter' @mouseleave='onMouseLeave'>
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
        timerId: null,
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
      onMouseEnter() {
        this.pause();
      },
      onMouseLeave() {
        this.playAutomatically();
      },
      playAutomatically() {
        if (this.timerId) {return}
        
        const run = () => {
          const index = this.names.indexOf(this.getSelected());
          let newIndex = index + 1;
          if (newIndex === this.names.length) {
            newIndex = 0
          }
          if (newIndex === -1) {
            newIndex = this.names.length - 1;
          }
          this.select(newIndex);
          this.timerId = setTimeout(run, 3000)
        };
        
        this.timerId = setTimeout(run, 3000)
      },
      pause() {
        clearTimeout(this.timerId);
        this.timerId = null;
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
          
          let reverse = this.lastSelectedIndex > this.selectedIndex ? true : false;
          if (this.timerId) {
            if (this.lastSelectedIndex === this.names.length -1 && this.selectedIndex === 0) {
              reverse = false;
            }
            if (this.lastSelectedIndex === 0 && this.selectedIndex === this.names.length -1 ) {
              reverse = true;
            }
          }
          vm.reverse = reverse;
          this.$nextTick(() => {
            vm.selected = selected;
          })
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
      padding: 8px 0;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      > span {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        background: #ddd;
        margin:0 8px;
        &:hover {
          cursor: pointer;
        }
        &.active {
          background: black;
          color: white;
          &:hover {
            cursor: default;
          }
        }
      }
    }
  }
</style>
