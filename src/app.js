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

Vue.use(plugin);

new Vue({
  el: '#app',
  data(){
    return {
      message: 'show',
      loading1: false,
      loading2: false,
      loading3: false,
    };
  },
  methods: {
    showToast() {
      this.$toast('你好呀', {
        autoClose: true,
      })
    },
    showToastHasCustomButton() {
      this.$toast('你好呀', {
        autoClose: false,
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
