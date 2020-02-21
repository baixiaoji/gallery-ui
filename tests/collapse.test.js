const expect = chai.expect;
import Vue from 'vue';
import Collapse from '../src/collapse/collapse';
import CollapseItem from '../src/collapse/collapse-item';

Vue.config.productionTip = false;
Vue.config.devtools = false;

Vue.component('g-collapse', Collapse);
Vue.component('g-collapse-item', CollapseItem);

describe('Collapse', () => {

  it('存在.', () => {
    expect(Collapse).to.exist;
  });

  describe('测试props', function() {
    it('selected', (done) => {
      const div = document.createElement('div');
      document.body.appendChild(div);
      div.innerHTML = `
        <g-collapse :selected='selectedTab'>
          <g-collapse-item title='中国' name='china'>
              <span id="content-1">年纪很大</span>
          </g-collapse-item>
          <g-collapse-item title='美国' name='america'>
              <span id="content-2">年纪很小</span>
          </g-collapse-item>
          <g-collapse-item title='英国' name='england'>
              <span id="content-3">曾今的大帝国</span>
          </g-collapse-item>
         </g-collapse>
    `;
      const vm = new Vue({
        el: div,
        data() {
          return {
            selectedTab: ['china']
          };
        },
      });
      vm.$nextTick(() => {
        expect(vm.$el.querySelector('#content-1')).to.exist;
        expect(vm.$el.querySelector('#content-2')).to.not.exist;
        expect(vm.$el.querySelector('#content-3')).to.not.exist;
        done();
      });
    });

    it('single', (done) => {
      const div = document.createElement('div');
      document.body.appendChild(div);
      div.innerHTML = `
        <g-collapse :selected='selectedTab'>
          <g-collapse-item title='中国' name='china'>
              <span id="content-1">年纪很大</span>
          </g-collapse-item>
          <g-collapse-item title='美国' name='america'>
              <span id="content-2">年纪很小</span>
          </g-collapse-item>
          <g-collapse-item title='英国' name='england'>
              <span id="content-3">曾今的大帝国</span>
          </g-collapse-item>
         </g-collapse>
    `;
      const vm = new Vue({
        el: div,
        data() {
          return {
            selectedTab: ['china']
          };
        },
      });
      setTimeout(() => {
        vm.$el.querySelector('div[data-name="china"]').click();
        setTimeout(() => {
          expect(vm.$el.querySelector('#content-1')).to.not.exist;
          done();
        })
      })
    });

    it('测试.sync', (done) => {
      const div = document.createElement('div');
      document.body.appendChild(div);
      div.innerHTML = `
        <g-collapse :selected='selectedTab' @update:selected='updateFn'>
          <g-collapse-item title='中国' name='china'>
              <span id="content-1">年纪很大</span>
          </g-collapse-item>
          <g-collapse-item title='美国' name='america'>
              <span id="content-2">年纪很小</span>
          </g-collapse-item>
          <g-collapse-item title='英国' name='england'>
              <span id="content-3">曾今的大帝国</span>
          </g-collapse-item>
         </g-collapse>
    `;
      const fakeMethod = sinon.fake();
      const vm = new Vue({
        el: div,
        data() {
          return {
            selectedTab: ['china']
          };
        },
        methods: {
          updateFn: fakeMethod,
        },
      });
      setTimeout(() => {
        vm.$el.querySelector('div[data-name="america"]').click();
        setTimeout(() => {
          expect(fakeMethod).to.have.been.called;
          done();
        })
      })
    });
  });
});
