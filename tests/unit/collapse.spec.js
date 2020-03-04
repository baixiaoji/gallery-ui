import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {mount} from '@vue/test-utils';

chai.use(sinonChai);
import Collapse from '../../src/collapse/collapse';
import CollapseItem from '../../src/collapse/collapse-item';


describe('Collapse', () => {

  it('存在.', () => {
    expect(Collapse).to.exist;
  });

  describe('测试props', function() {
    it('selected', () => {
      const wrapper = mount(Collapse, {
        stubs: {
          'g-collapse-item': CollapseItem
        },
        propsData: {
          selected: ['china']
        },
        slots: {
          default: `
            <g-collapse-item title='中国' name='china'>
                <span id="content-1">年纪很大</span>
            </g-collapse-item>
            <g-collapse-item title='美国' name='america'>
                <span id="content-2">年纪很小</span>
            </g-collapse-item>
            <g-collapse-item title='英国' name='england'>
                <span id="content-3">曾今的大帝国</span>
            </g-collapse-item>
            `,
        },
      });

      wrapper.vm.$nextTick().then(() => {
        expect(wrapper.find('#content-1').element).to.exist;
        expect(wrapper.find('#content-2').element).to.not.exist;
        expect(wrapper.find('#content-3').element).to.not.exist;
      })

    });

    it('single', () => {
      const wrapper = mount(Collapse, {
        stubs: {
          'g-collapse-item': CollapseItem
        },
        propsData: {
          selected: ['china']
        },
        slots: {
          default: `
            <g-collapse-item title='中国' name='china'>
                <span id="content-1">年纪很大</span>
            </g-collapse-item>
            <g-collapse-item title='美国' name='america'>
                <span id="content-2">年纪很小</span>
            </g-collapse-item>
            <g-collapse-item title='英国' name='england'>
                <span id="content-3">曾今的大帝国</span>
            </g-collapse-item>
            `,
        },
      });
      const chinaPanel = wrapper.find('div[data-name="china"]')
      chinaPanel.trigger('click');

      console.log(wrapper.find('#content-1'));

      wrapper.vm.$nextTick().then(() => {
        expect(wrapper.find('#content-1').element).to.not.exist;
      });
    });

    it('测试.sync', () => {
      const wrapper = mount(Collapse, {
        stubs: {
          'g-collapse-item': CollapseItem
        },
        propsData: {
          selected: ['china']
        },
        slots: {
          default: `
            <g-collapse-item title='中国' name='china'>
                <span id="content-1">年纪很大</span>
            </g-collapse-item>
            <g-collapse-item title='美国' name='america'>
                <span id="content-2">年纪很小</span>
            </g-collapse-item>
            <g-collapse-item title='英国' name='england'>
                <span id="content-3">曾今的大帝国</span>
            </g-collapse-item>
            `,
        },
      });

      const fakeMethod = sinon.fake();
      wrapper.vm.$on('update:selected', fakeMethod);

      wrapper.find('div[data-name="america"]').trigger('click');

      expect(fakeMethod).to.have.been.called;

    });
  });
});
