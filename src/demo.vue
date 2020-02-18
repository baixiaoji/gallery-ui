<template>
  <div>
    <div>{{selectArray}}</div>
    <g-cascader :source.sync='source' popover-height='300px' :selected.sync="selectArray"
                :loadData='loadData'
    />
    <div>2222222222222</div>
  </div>
</template>

<script>
  import Cascader from './cascader/cascader.vue';
  import db from './db.js';

  function ajax (parentId = 0) {
    return new Promise((success, fail) => {
      setTimeout(() => {
        let result = db.filter((item) => item.parent_id == parentId);
        result.forEach(item => {
          item.isLeaf = db.filter(data => data.parent_id === item.id).length > 0;
        });
        success(result)
      }, 300)
    })
  }
  
  
  export default {
    components: {
      'g-cascader': Cascader,
    },
    data(){
      return {
        selectArray: [],
        source: [],
      };
    },
    created () {
      ajax(0).then(result => {
        this.source = result
      })
    },
    methods: {
      loadData ({id}, updateSource) {
        ajax(id).then(result => {
          updateSource(result) // 回调:把别人传给我的函数调用一下
        })
      },
    },
  };
</script>

<style lang='scss'>
  * {margin: 0; padding: 0; box-sizing: border-box;}
  :root {
    --button-height: 32px;
    --font-size: 14px;
  }
  body {
    font-size: var(--font-size);
    padding: 100px;
    border: 1px solid black;
  }
</style>
