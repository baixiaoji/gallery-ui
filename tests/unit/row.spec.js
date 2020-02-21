import chai, {expect} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import {mount, shallowMount} from '@vue/test-utils';

chai.use(sinonChai);
import Row from '@/grid/row';
import Col from '@/grid/col';


describe('Row', () => {

  it('存在.', () => {
    expect(Row).to.exist;
  });
  xit('接收 gutter 属性.', () => {
    const wrapper = mount(Row, {
      stubs: {
        'g-row': Row,
        'g-col': Col,
      },
      slots: {
        default: `
          <g-row gutter="20">
            <g-col span="12"></g-col>
            <g-col span="12"></g-col>
          </g-row>
        `,
      },
    })

    const row = wrapper.find('.row');
    console.log(row.html());
    expect(row.attributes().marginLeft).to.eq('-10px');
    expect(row.attributes().marginRight).to.eq('-10px');
  });
  xit('接收 align 属性', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const Constructor = Vue.extend(Row);
    const vm = new Constructor({
      propsData: {
        align: 'right',
      },
    }).$mount(div);
    const element = vm.$el;
    expect(getComputedStyle(element).justifyContent).to.equal('flex-end');
    div.remove();
    vm.$destroy();
  });

});
