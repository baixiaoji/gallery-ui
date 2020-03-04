import chai, {expect} from 'chai';
import sinon, {xhr} from 'sinon';
import sinonChai from 'sinon-chai';
import {mount, shallowMount} from '@vue/test-utils';
chai.use(sinonChai);
import Toast from '../../src/toast/toast';

describe('Toast', () => {

  it('存在.', () => {
    expect(Toast).to.exist;
  });

  describe('测试props', function() {
    it('接受autoClose', function(done) {
      const wrapper = mount(Toast, {
        propsData: {
          autoClose: 1,
        },
      });
      const vm = wrapper.vm;
      vm.$on('close', () => {
        expect(document.body.contains(vm.$el)).to.eq(false);
        done();
      });
    });

    it('接受closeButton', function() {
      const fn = sinon.fake();

      const wrapper = mount(Toast, {
        propsData: {
          closeButton: {
            text: '关闭',
            callback: fn,
          },
        },
      });
      const vm = wrapper.vm;
      const closeButton = vm.$el.querySelector('.close');
      expect(closeButton.innerHTML.trim()).to.eq('关闭');
      closeButton.click();
      expect(fn).to.have.been.called;
    });
    xit('接受enableHtml', function() {
      // [Vue warn]: Error in render: "TypeError: Converting circular structure to JSON"
      const wrapper = shallowMount(Toast, {
        propsData: {
          enableHtml: true,
        },
        slots: {
          default: `<strong>你好</strong>`,
        },
      });
      const vm  = wrapper.vm;
      expect(vm.$el.querySelector('strong')).to.exist;
    });

    it('position', function() {
      const wrapper = shallowMount(Toast, {
        propsData: {
          position: 'middle',
        },
      });

      expect(wrapper.classes()).to.includes('toast-position-middle');
    });
  });
});
