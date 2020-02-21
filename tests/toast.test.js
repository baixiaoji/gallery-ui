const expect = chai.expect;
import Vue from 'vue';
import Toast from '../src/toast';

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe('Toast', () => {

  it('存在.', () => {
    expect(Toast).to.exist;
  });

  describe('测试props', function() {
    it('接受autoClose', function(done) {
      let div = document.createElement('div');
      document.body.appendChild(div);
      const Constructor = Vue.extend(Toast);
      const vm = new Constructor({
        propsData: {
          autoClose: 1,
        },
      }).$mount(div);
      vm.$on('close', () => {
        expect(document.body.contains(vm.$el)).to.eq(false);
        done();
      });
    });

    it('接受closeButton', function() {
      const fn = sinon.fake();
      const Constructor = Vue.extend(Toast);
      const vm = new Constructor({
        propsData: {
          closeButton: {
            text: '关闭',
            callback: fn,
          },
        },
      }).$mount();
      const closeButton = vm.$el.querySelector('.close');
      expect(closeButton.innerHTML.trim()).to.eq('关闭');
      closeButton.click();
      expect(fn).to.have.been.called;
    });
    it('接受enableHtml', function() {
      const Constructor = Vue.extend(Toast);
      const vm = new Constructor({
        propsData: {
          enableHtml: true,
        },
      });
      vm.$slots.default = [`<strong>你好</strong>`];
      vm.$mount();

      expect(vm.$el.querySelector('strong')).to.exist;
    });

    it('position', function() {
      const Constructor = Vue.extend(Toast);
      const vm = new Constructor({
        propsData: {
          position: 'middle',
        },
      }).$mount();
      expect(vm.$el.classList.contains('toast-position-middle')).to.eq(true);
    });
  });
});
