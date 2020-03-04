import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {mount, shallowMount} from '@vue/test-utils';
chai.use(sinonChai);
import Button from '../../src/button/button.vue';

describe('button.vue', () => {
  it('存在.', () => {
    const wrapper = shallowMount(Button);
    expect(wrapper).to.be.ok;
  });

  it('可以设置icon.', () => {
    const wrapper = mount(Button, {
      propsData: {
        icon: 'settings',
      },
    });
    const useElement = wrapper.find('use');
    expect(useElement.attributes().href).to.include('icon-settings');
  });
  it('可以设置loading.', () => {
    const wrapper = mount(Button, {
      propsData: {
        icon: 'settings',
        loading: true,
      },
    });
    const useElements = wrapper.find('use');
    expect(useElements.attributes().href).to.equal('#icon-loading');
  });
  xit('icon 默认的 order 是 1', () => {
    const wrapper = mount(Button, {
      propsData: {
        icon: 'settings',
      },
    });
    const vm = wrapper.vm;
    const icon = vm.$el.querySelector('svg');
    expect(getComputedStyle(icon).order).to.eq('1');
  });
  xit('设置 iconPosition 可以改变 order', () => {
    const wrapper = mount(Button, {
      propsData: {
        icon: 'settings',
        iconPosition: 'right',
      },
    });
    const vm = wrapper.vm;
    const icon = vm.$el.querySelector('svg');
    expect(getComputedStyle(icon).order).to.eq('2');
    vm.$el.remove();
    vm.$destroy();
  });
  it('点击 button 触发 click 事件', () => {
    const wrapper = mount(Button, {
      propsData: {
        icon: 'settings',
      },
    });
    const vm = wrapper.vm;
    const callback = sinon.fake();
    vm.$on('click', callback);
    vm.$el.click();
    expect(callback).to.have.been.called;
  });
});
