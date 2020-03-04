<template>
  <div class="g-nav">
    <slot/>
  </div>
</template>

<script>
  export default {
    name: 'Gui-Nav',
    props: {
      selected: {
        type: Array,
        default() {
          return {};
        },
      },
      multiple: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      items() {
        return this.$children.filter(vm => vm.$options.name === 'Gui-NavItem');
      },
    },
    mounted() {
      this.updateChildren();
      this.listenChildren();
    },
    updated() {
      this.updateChildren();
    },
    methods: {
      updateChildren() {
        this.items.forEach(vm => {
          vm.selected = this.selected.indexOf(vm.name) >= 0;
        });
      },
      listenChildren() {
        this.items.forEach(vm => {
          vm.$on('add:selected', (name) => {
            if (this.multiple) {
              if (this.selected.indexOf(name) >=0 ){} else {
                const copy = JSON.parse(JSON.stringify(this.selected));
                copy.push(name);
                this.$emit('update:selected', copy);
              }
            } else {
              this.$emit('update:selected', [name]);
            }
          })
        })
      },
    },
  };
</script>

<style scoped lang='scss'>
  .g-nav {
    display: flex;
    background: #ddd;
  }
</style>
