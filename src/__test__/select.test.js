import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Select from '../components/select/select.js';
configure({ adapter: new Adapter() });

const optionList = [
  { value: 'Ocean', color: '#00B8D9' },
  { value: 'Blue', color: '#0052CC', isDisabled: true },
  { value: 'Purple', color: '#5243AA' },
  { value: 'Red', color: '#FF5630' },
  { value: 'Orange', color: '#FF8B00' },
  { value: 'Yellow', color: '#FFC400' },
  { value: 'Green', color: '#36B37E' },
  { value: 'Forest', color: '#00875A' },
  { value: 'Slate', color: '#253858' },
  { value: 'Silver', color: '#666666' },
];

describe('Select Component', () => {
  it('Select exist', () => {
    expect(Select).toBeTruthy();
  });
  describe('attributes', () => {
    it('accept placeholder && noOptionsText', () => {
      const wrapper = mount(<Select placeholder="123" noOptionsText="456" />);
      const placeholder = wrapper.find('.placeholder').at(0);
      const input = wrapper.find('.inputWrapper').at(0);
      input.simulate('click');
      const noItem = wrapper.find('.noItem').at(0);
      expect(noItem.exists()).toEqual(true);
      expect(placeholder.text()).toEqual('123');
      expect(noItem.text()).toEqual('456');
    });
    it('accept optionsIsLoading && loadingText & loadingIcon', () => {
      const wrapper = mount(<Select optionsIsLoading={true} loadingText="loading" isLoadingIcon={false} />);
      const input = wrapper.find('.inputWrapper').at(0);
      input.simulate('click');
      const loadingItem = wrapper.find('.loadingItem').at(0);
      const loadingIcon = wrapper.find('.loadingIcon').at(0);
      expect(loadingItem.exists()).toEqual(true);
      expect(loadingItem.text()).toEqual('loading');
      expect(loadingIcon.exists()).toEqual(false);
    });
    it('accept select && onSelectChange && isClearable', () => {
      const fakeFn = jest.fn();
      const wrapper = mount(<Select select="text" isClearable={true} onSelectChange={fakeFn} />);
      const selectValue = wrapper.find('.selectValue').at(0);
      const clearIcon = wrapper.find('.clearAllIcon').at(0);
      expect(selectValue.text()).toEqual('text');
      expect(selectValue.exists()).toEqual(true);
      expect(clearIcon.exists()).toEqual(true);
      expect(clearIcon.prop('style')).toHaveProperty('visibility', '');
      clearIcon.simulate('click');
      expect(
        wrapper
          .find('.selectValue')
          .at(0)
          .exists(),
      ).toEqual(false);
      expect(
        wrapper
          .find('.clearAllIcon')
          .at(0)
          .prop('style'),
      ).toHaveProperty('visibility', 'hidden');
      expect(fakeFn).toHaveBeenCalled();
    });
    it('accept children', () => {
      const wrapper = mount(
        <Select>
          {optionList.map(item => {
            return (
              <div key={item.value} value={item.value} disabled={item.isDisabled} color={item.color}>
                {item.value}
              </div>
            );
          })}
        </Select>,
      );
      const drapDown = wrapper.find('.dropdownIcon').at(0);
      drapDown.simulate('click');
      const selectListWrapper = wrapper.find('.selectListWrapper').at(0);
      expect(selectListWrapper.find('.selectList').children().length).toEqual(10)
    });
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
