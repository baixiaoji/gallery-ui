import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {createLocalVue, mount, shallowMount} from '@vue/test-utils';
chai.use(sinonChai);

import TabsItem from '../../src/tabs/tabs-item';

const localVue = createLocalVue();
describe('Toast', () => {

  it('存在.', () => {
    expect(TabsItem).to.exist;
  });

  describe('测试props', function() {
    it('接受 name 属性', () => {
      const wrapper = shallowMount(TabsItem, {
        propsData: {
          name: 'aaa',
        },
        provide: {
          eventBus: new localVue,
        }
      });
      expect(wrapper.attributes()['data-name']).to.eq('aaa');
    });
    it('接受 disabled 属性', () => {
      const wrapper = shallowMount(TabsItem, {
        propsData: {
          disabled: true,
          name: 'bbb',
        },
        provide: {
          eventBus: new localVue,
        }
      });
      const vm = wrapper.vm;
      expect(wrapper.classes()).to.includes('disabled');
      const callback = sinon.fake();
      vm.$on('click', callback);
      wrapper.trigger('click');
      expect(callback).to.have.not.been.called;
    });
  });
});
