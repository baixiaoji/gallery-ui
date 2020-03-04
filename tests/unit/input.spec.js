import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {mount, shallowMount} from '@vue/test-utils';

chai.use(sinonChai);
import Vue from 'vue';
import Input from '../../src/input';

describe('Input', () => {

  it('存在.', () => {
    expect(Input).to.exist;
  });

  describe('props', () => {

    it('接收 value', () => {
      const wrapper = mount(Input, {
        propsData: {
          value: '1234',
        },
      });
      expect(wrapper.find('input').element.value).to.equal('1234');
    });

    it('接收 disabled', () => {
      const wrapper = mount(Input, {
        propsData: {
          disabled: true,
        },
      });
      expect(wrapper.find('input').element.disabled).to.equal(true);
    });
    it('接收 readonly', () => {
      const wrapper = mount(Input, {
        propsData: {
          readonly: true,
        },
      });
      expect(wrapper.find('input').attributes().readonly).to.equal('readonly');
    });

    it('接收 error', () => {
      const wrapper = mount(Input, {
        propsData: {
          error: '你错了',
        },
      });
      const useElement =  wrapper.find('use');
      expect(useElement.attributes().href).to.equal('#icon-error');
      const errorMessage = wrapper.find('.errorMessage');
      expect(errorMessage.text()).to.equal('你错了');
    });
  });
  describe('事件', () => {

    it('支持 change/input/focus/blur 事件', () => {
      ['change', 'input', 'focus', 'blur']
      .forEach((eventName) => {
        const wrapper = mount(Input, {
          propsData: {
            error: '你错了',
          },
        });
        const callback = sinon.fake();
        wrapper.vm.$on(eventName, callback);

        const vm = wrapper.vm;


        let event = new Event(eventName);
        Object.defineProperty(
          event, 'target', {
            value: {value: 'hi'}, enumerable: true,
          },
        );
        let inputElement = vm.$el.querySelector('input');
        inputElement.dispatchEvent(event);
        expect(callback).to.have.been.calledWith('hi');
      });
    });
  });
});
