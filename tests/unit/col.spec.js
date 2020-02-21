import chai, {expect} from 'chai';
import sinonChai from 'sinon-chai';
import {mount} from '@vue/test-utils';
chai.use(sinonChai);

import Col from '@/grid/col';

describe('Col', () => {

  it('存在.', () => {
    expect(Col).to.exist;
  });
  it('接收 span 属性', () => {
    const wrapper = mount(Col, {
      propsData: {
        span: 1,
      },
    });
    expect(wrapper.classes()).to.include('col-1');
  });
  it('接收 offset 属性', () => {
    const wrapper = mount(Col, {
      propsData: {
        offset: 1,
      },
    });
    expect(wrapper.classes()).to.include('offset-1');
  });
  it('接收 pc 属性', () => {
    const wrapper = mount(Col, {
      propsData: {
        pc: {
          span: 1,
          offset: 2,
        },
      },
    });
    expect(wrapper.classes()).to.include('col-pc-1');
    expect(wrapper.classes()).to.include('offset-pc-2');
  });
  it('接收 ipad 属性', () => {
    const wrapper = mount(Col, {
      propsData: {
        ipad: {
          span: 1,
          offset: 2,
        },
      },
    });
    expect(wrapper.classes()).to.include('col-ipad-1');
    expect(wrapper.classes()).to.include('offset-ipad-2');
  });
  it('接收 narrow-pc 属性', () => {
    const wrapper = mount(Col, {
      propsData: {
        narrowPc: {
          span: 1,
          offset: 2,
        },
      },
    });
    expect(wrapper.classes()).to.include('col-narrow-pc-1');
    expect(wrapper.classes()).to.include('offset-narrow-pc-2');
  });
  it('接收 wide-pc 属性', () => {
    const wrapper = mount(Col, {
      propsData: {
        widePc: {
          span: 1,
          offset: 2,
        },
      },
    });
    expect(wrapper.classes()).to.include('col-wide-pc-1');
    expect(wrapper.classes()).to.include('offset-wide-pc-2');
  });

});
