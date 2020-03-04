import chai, {expect} from 'chai';
import sinonChai from 'sinon-chai';
import {mount} from '@vue/test-utils';
chai.use(sinonChai);

import Tabs from '../../src/tabs/tabs';

import TabHead from '../../src/tabs/tabs-head';
import TabItem from '../../src/tabs/tabs-item';
import TabBody from '../../src/tabs/tabs-body';
import TabPane from '../../src/tabs/tabs-pane';


describe('Tabs', () => {

  it('存在.', () => {
    expect(Tabs).to.exist;
  });

  describe('测试props', function() {
    it('selected', function() {
      const wrapper = mount(Tabs, {
        propsData: {
          selected: 'backEnd',
        },
        stubs: {
          'g-tabs-head': TabHead,
          'g-tabs-item': TabItem,
          'g-tabs-body': TabBody,
          'g-tabs-pane': TabPane,
        },
        slots: {
          default: `
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
          `,
        },
      });
      wrapper.vm.$nextTick().then(() => {
        const selectedTab = wrapper.find('div[data-name="backEnd"]')
        expect(selectedTab.classes()).to.includes('active');
      })
    });

  });
});
