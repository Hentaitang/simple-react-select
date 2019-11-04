import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Select from '../components/select/select.js';
configure({ adapter: new Adapter() });

describe('Select Component', () => {
  it('Select exist', () => {
    expect(Select).toBeTruthy();
  });
  describe('attributes', () => {
    it('accept placeholder & noOptionsText', () => {
      const wrapper = mount(<Select placeholder="123" noOptionsText="456" />);
      const placeholder = wrapper.find('.placeholder').at(0);
      const input = wrapper.find('.inputWrapper').at(0);
      input.simulate('click');
      const noItem = wrapper.find('.noItem').at(0);
      expect(noItem.exists()).toEqual(true);
      expect(placeholder.text()).toEqual('123');
      expect(noItem.text()).toEqual('456');
    });
    it('accept optionsIsLoading & loadingText & loadingIcon', ()=>{
      const wrapper = mount(<Select optionsIsLoading={true} loadingText="loading" loadingIcon={false}/>);
      const input = wrapper.find('.inputWrapper').at(0);
      input.simulate('click');
      const loadingItem = wrapper.find('.loadingItem').at(0);
      const loadingIcon = wrapper.find('.loadingIcon').at(0);
      expect(loadingItem.exists()).toEqual(true);
      expect(loadingItem.text()).toEqual('loading');
      expect(loadingIcon.exists()).toEqual(false);
    })
  });
  describe('action', () => {
    it('show select list', () => {
      const wrapper = mount(<Select />);
      const input = wrapper.find('.inputWrapper').at(0);
      input.simulate('click');
      const list = wrapper.find('.selectListWrapper').at(0);
      expect(list.exists()).toEqual(true);
    });
    it('hide select list', () => {
      const wrapper = mount(<Select />);
      const input = wrapper.find('.inputWrapper').at(0);
      const drapDown = wrapper.find('.dropdownIcon').at(0);
      input.simulate('click');
      expect(
        wrapper
          .find('.selectListWrapper')
          .at(0)
          .exists(),
      ).toEqual(true);
      drapDown.simulate('click');
      expect(
        wrapper
          .find('.selectListWrapper')
          .at(0)
          .exists(),
      ).toEqual(false);
    });
  });
});
