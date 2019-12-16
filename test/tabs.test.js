const expect = chai.expect;
import Vue from 'vue';
import Tabs from '../src/tabs/tabs';

Vue.config.productionTip = false;
Vue.config.devtools = false;

import TabHead from '../src/tabs/tabs-head';
import TabItem from '../src/tabs/tabs-item';
import TabBody from '../src/tabs/tabs-body';
import TabPane from '../src/tabs/tabs-pane';

Vue.component('g-tabs', Tabs);
Vue.component('g-tabs-head', TabHead);
Vue.component('g-tabs-item', TabItem);
Vue.component('g-tabs-body', TabBody);
Vue.component('g-tabs-pane', TabPane);

describe('Toast', () => {

  it('存在.', () => {
    expect(Tabs).to.exist;
  });

  describe('测试props', function() {
    it('selected', function(done) {
      const div = document.createElement('div');
      document.body.appendChild(div);
      div.innerHTML = `
        <g-tabs selected='backEnd'>
    <g-tabs-head>
      <g-tabs-item name='fontEnd'>
       前端
      </g-tabs-item>
      <g-tabs-item name='backEnd'>后端</g-tabs-item>
      <g-tabs-item name='operation'>运维</g-tabs-item>
      
      <div slot='action'>
        <button>测试</button>
      </div>
    </g-tabs-head>
    <g-tabs-body>
      <g-tabs-pane name='fontEnd'>前端的资讯内容</g-tabs-pane>
      <g-tabs-pane  name='backEnd'>后端的资讯内容</g-tabs-pane>
      <g-tabs-pane name='operation'>运营的资讯内容</g-tabs-pane>
    </g-tabs-body>
  </g-tabs>
    `;
      const vm = new Vue({
        el: div,
      });
      vm.$nextTick(() => {
        const item = vm.$el.querySelector(`.tab-item[data-name='backEnd']`);
        expect(item.classList.contains('active')).to.be.true;
        done();
      })
    });

  });
});
