<template>
  <div>
    
    <g-cascader :source.sync='source' popover-height='300px' :selected.sync="selectArray"
                :loadData='loadData'
    />
    <div>{{selectArray}}</div>
  </div>
</template>

<script>
  import Cascader from './cascader/cascader.vue';
  import db from './db.js';

  function ajax(parentId = 0) {
    return new Promise((success, fail) => {
      setTimeout(() => {
        let result = db.filter((item) => item.parent_id == parentId);
        result.forEach(item => {
          item.isLeaf = !db.filter(data => data.parent_id === item.id).length > 0;
        });
        success(result);
      }, 300);
    });
  }

  export default {
    components: {
      'g-cascader': Cascader,
    },
    data() {
      return {
        selectArray: [],
        source: [{
          name: '浙江',
          children: [
            {
              name: '杭州',
              children: [
                {name: '上城'},
                {name: '下城'},
                {name: '江干'},
              ]
            },
            {
              name: '嘉兴',
              children: [
                {name: '南湖'},
                {name: '秀洲'},
                {name: '嘉善'},
              ]
            },
          ]
        }, {
          name: '福建',
          children: [
            {
              name: '福州',
              children: [
                {name: '鼓楼'},
                {name: '台江'},
                {name: '仓山'},
              ]
            },
          ]
        }, {
          name: '安徽',
          children: [{
            name: '合肥',
            children: [{
              name: '瑶海'
            }, {
              name: '庐阳'
            }]
          }]
        }],
      };
    },
    created() {
      ajax(0).then(result => {
        this.source = result;
      });
    },
    methods: {
      loadData({id}, updateSource) {
        ajax(id).then(result => {
          updateSource(result); // 回调:把别人传给我的函数调用一下
        });
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
