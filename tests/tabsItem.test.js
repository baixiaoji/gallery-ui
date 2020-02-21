const expect = chai.expect;
import Vue from 'vue';
import TabsItem from '../src/tabs/tabs-item';

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe('Toast', () => {

  it('存在.', () => {
    expect(TabsItem).to.exist;
  });

  describe('测试props', function() {
    it('接受 name 属性', () => {
      const Constructor = Vue.extend(TabsItem);
      const vm = new Constructor({
        propsData: {
          name: 'aaa',
        },
      }).$mount();
      expect(vm.$el.getAttribute('data-name')).to.eq('aaa');
    });
    it('接受 disabled 属性', () => {
      const Constructor = Vue.extend(TabsItem);
      const vm = new Constructor({
        propsData: {
          disabled: true,
        },
      }).$mount();
      expect(vm.$el.classList.contains('disabled')).to.be.true;
      const callback = sinon.fake();
      vm.$on('click', callback);
      vm.$el.click();
      expect(callback).to.have.not.been.called;
    });
  });
});
