<template>
  <div class='g-slides'
       @mouseenter='onMouseEnter'
       @mouseleave='onMouseLeave'
       @touchstart='onTouchStart'
       @touchmove='onTouchMove'
       @touchend='onTouchEnd'
  >
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
        startTouch: undefined,
      };
    },
    computed: {
      names() {
        return this.$children.map(vm => vm.name);
      },
      selectedIndex() {
        const index = this.names.indexOf(this.selected);
        return  index === -1 ? 0 : index;
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
      onTouchStart(e) {
        console.log('开始移动');
        this.startTouch = e.touches[0];
        this.pause();
      },
      onTouchMove() {},
      onTouchEnd(e) {
        const endTouch = e.changedTouches[0];
        console.log(endTouch);
        const {clientX: x1,clientY:y1} = this.startTouch;
        const {clientX: x2,clientY:y2} = endTouch;
        const distance = Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2));
        console.log('distance');
        console.log(distance);
        const deltaY = Math.abs(y1-y2);
        const rate = distance / deltaY;
        console.log(rate);
        if (rate > 2) {
          if (x2 > x1) {
            console.log('right');
            this.select(this.selectedIndex -1);
          }else {
            console.log('left');
            this.select(this.selectedIndex + 1);
          }
        }
        this.$nextTick(() => {
          this.playAutomatically();
        })
      },
      playAutomatically() {
        if (this.timerId) {return}
        
        const run = () => {
          const index = this.names.indexOf(this.getSelected());
          let newIndex = index + 1;
          this.select(newIndex);
          this.timerId = setTimeout(run, 3000)
        };
        
        this.timerId = setTimeout(run, 3000)
      },
      pause() {
        clearTimeout(this.timerId);
        this.timerId = null;
      },
      select(newIndex) {
        this.lastSelectedIndex = this.selectedIndex;
        if (newIndex === this.names.length) {
          newIndex = 0
        }
        if (newIndex === -1) {
          newIndex = this.names.length - 1;
        }
        this.$emit('update:selected', this.names[newIndex ]);
      },
      getSelected() {
        const first = this.$children[0];
        return this.selected || first.name;
      },
      updateChildren() {
        const selected = this.getSelected();
        this.$children.forEach((vm) => {
          
          let reverse = this.lastSelectedIndex > this.selectedIndex ? true : false;
          // 定时器存在特殊处理左右边界
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
