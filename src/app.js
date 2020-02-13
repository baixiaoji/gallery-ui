import Vue from 'vue';
import Button from './button.vue';
import Icon from './icon.vue';
import ButtonGroup from './button-group.vue';
import Input from './input';
import Row from './grid/row';
import Col from './grid/col';
import Layout from './layout';
import Header from './header';
import Main from './main';
import Footer from './footer';
import Aside from './aside';
import Toast from './toast'
import plugin from './plugin';
import Tab from './tabs/tabs';
import TabHead from './tabs/tabs-head';
import TabItem from './tabs/tabs-item';
import TabBody from './tabs/tabs-body';
import TabPane from './tabs/tabs-pane';
import Popover from './popover';
import Collapse from './collapse/collapse';
import CollapseItem from './collapse/collapse-item';
import Cascader from './cascader/cascader';

Vue.component('g-button', Button);
Vue.component('g-icon', Icon);
Vue.component('g-button-group', ButtonGroup);
Vue.component('g-input', Input);
Vue.component('g-row', Row);
Vue.component('g-col', Col);
Vue.component('g-layout', Layout);
Vue.component('g-header', Header);
Vue.component('g-main', Main);
Vue.component('g-footer', Footer);
Vue.component('g-aside', Aside);
Vue.component('g-toast', Toast);
Vue.component('g-tabs', Tab);
Vue.component('g-tabs-head', TabHead);
Vue.component('g-tabs-item', TabItem);
Vue.component('g-tabs-body', TabBody);
Vue.component('g-tabs-pane', TabPane);
Vue.component('g-popover', Popover);
Vue.component('g-collapse', Collapse);
Vue.component('g-collapse-item', CollapseItem);
Vue.component('g-cascader', Cascader);

Vue.use(plugin);

new Vue({
  el: '#app',
  data(){
    return {
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
  methods: {
    yyy() {
      console.log('yyy');
    },
    showToast() {
      this.$toast('你好呀', {
        autoClose: false,
        position: 'top',
      })
    },
    showToastHasCustomButton() {
      this.$toast('你好呀', {
        autoClose: false,
        position: 'middle',
        closeButton: {
          text: '关闭',
          callback() {
            console.log('触发回调');
          },
        },
      })
    },
    showEnableHtmlToast() {
      this.$toast('你真的<b>好</b>吗？', {
        autoClose: false,
        enableHtml: true,
        position: 'bottom',
        closeButton: {
          text: '关闭',
          callback() {
            console.log('触发回调');
          },
        },
      })
    },
  },
});
