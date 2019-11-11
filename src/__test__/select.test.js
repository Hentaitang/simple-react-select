import React, { memo, useState, useEffect } from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Select from '../components/select/select.js';
import ReactDOM from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
configure({ adapter: new Adapter() });

const optionList = [
  { value: 'Ocean', color: '#00B8D9' },
  { value: 'Blue', color: '#0052CC', isDisabled: true },
  { value: 'Purple', color: '#5243AA' },
  { value: 'Red', color: '#FF5630' },
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
      wrapper.find('input').at(0).simulate('keyDown', { keyCode: 40 })
      wrapper.find('input').at(0).simulate('keyDown', { keyCode: 38 })
    });
    it('accept optionsIsLoading && loadingText & no loadingIcon', () => {
      const wrapper = mount(<Select optionsIsLoading={true} loadingText="loading" isLoadingIcon={false} />);
      const input = wrapper.find('.inputWrapper').at(0);
      input.simulate('click');
      const loadingItem = wrapper.find('.loadingItem').at(0);
      const loadingIcon = wrapper.find('.loadingIcon').at(0);
      expect(loadingItem.exists()).toEqual(true);
      expect(loadingItem.text()).toEqual('loading');
      expect(loadingIcon.exists()).toEqual(false);
    });
    it('accept optionsIsLoading && no loadingText & loadingIcon', () => {
      const wrapper = mount(<Select optionsIsLoading={true} isLoadingIcon={true} />);
      const input = wrapper.find('.inputWrapper').at(0);
      input.simulate('click');
      const loadingItem = wrapper.find('.loadingItem').at(0);
      const loadingIcon = wrapper.find('.loadingIcon').at(0);
      expect(loadingItem.exists()).toEqual(true);
      expect(loadingIcon.exists()).toEqual(true);
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
    it('accept children & style', () => {
      const wrapper = mount(
        <Select style={{ width: '500px', maxHeight: '200px' }}>
          {optionList.map(item => {
            return (
              <div key={item.value} value={item.value} disabled={item.isDisabled}>
                {item.value}
              </div>
            );
          })}
        </Select>,
      );
      const selectWrapper = wrapper.find('.selectWrapper').at(0);
      expect(selectWrapper.prop('style')).toHaveProperty('width', '500px');
      const drapDown = wrapper.find('.dropdownIcon').at(0);
      drapDown.simulate('click');
      const selectListWrapper = wrapper.find('.selectListWrapper').at(0);
      expect(selectListWrapper.prop('style')).toHaveProperty('maxHeight', '200px');
      expect(selectListWrapper.find('.selectList').children().length).toEqual(4);
      expect(
        selectListWrapper
          .find('.selectList')
          .children()
          .at(1)
          .prop('style'),
      ).toHaveProperty('cursor', 'not-allowed');
      wrapper.unmount();
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
    it('click options', () => {
      const wrapper = mount(
        <Select>
          {optionList.map(item => {
            return (
              <div key={item.value} value={item.value} disabled={item.isDisabled}>
                {item.value}
              </div>
            );
          })}
        </Select>,
      );
      const selectValue = wrapper.find('.selectValue').at(0);
      expect(selectValue.exists()).toEqual(false);
      const drapDown = wrapper.find('.dropdownIcon').at(0);
      drapDown.simulate('click');
      const selectListWrapper = wrapper.find('.selectListWrapper').at(0);
      const defaultItem = selectListWrapper
        .find('.selectList')
        .children()
        .at(0);
      expect(defaultItem.prop('style')).toHaveProperty('backgroundColor', '#f5f7fa');
      const selectItem = selectListWrapper
        .find('.selectList')
        .children()
        .at(2);
      selectItem.simulate('click');
      expect(
        wrapper
          .find('.selectValue')
          .at(0)
          .exists(),
      ).toEqual(true);
      expect(
        wrapper
          .find('.selectValue')
          .at(0)
          .text(),
      ).toEqual('Purple');
      expect(
        wrapper
          .find('.selectListWrapper')
          .at(0)
          .exists(),
      ).toEqual(false);
      drapDown.simulate('click');
      const disabledItem = selectListWrapper
        .find('.selectList')
        .children()
        .at(1);
      disabledItem.simulate('click');
      expect(
        wrapper
          .find('.selectValue')
          .at(0)
          .exists(),
      ).toEqual(true);
      expect(
        wrapper
          .find('.selectValue')
          .at(0)
          .text(),
      ).toEqual('Purple');
      expect(
        wrapper
          .find('.selectListWrapper')
          .at(0)
          .exists(),
      ).toEqual(true);
    });
    it('click outside', () => {
      var div = document.createElement('div');
      document.body.appendChild(div);
      ReactDOM.render(<Select />, div);
      const input = document.querySelector('.inputWrapper');
      expect(document.querySelector('.selectListWrapper')).toEqual(null);
      Simulate.click(input);
      expect(document.querySelector('.selectListWrapper')).not.toEqual(null);
      act(() => {
        document.dispatchEvent(new Event('click'));
      });
      expect(document.querySelector('.selectListWrapper')).toEqual(null);
      document.body.removeChild(div);
    });
    it('mouseEnter options', () => {
      const wrapper = mount(
        <Select>
          {optionList.map(item => {
            return (
              <div key={item.value} value={item.value} disabled={item.isDisabled}>
                {item.value}
              </div>
            );
          })}
        </Select>,
      );
      const drapDown = wrapper.find('.dropdownIcon').at(0);
      drapDown.simulate('click');
      const selectItem = wrapper
        .find('.selectList')
        .children()
        .at(3);
      selectItem.simulate('mouseEnter');
      expect(
        wrapper
          .find('.selectList')
          .children()
          .at(3)
          .prop('style'),
      ).toHaveProperty('backgroundColor', '#f5f7fa');
    });
    it('keydown', () => {
      var div = document.createElement('div');
      document.body.appendChild(div);
      ReactDOM.render(
        <Select style={{ width: '300px', maxHeight: '100px' }}>
          {optionList.map(item => {
            return (
              <div key={item.value} value={item.value}>
                {item.value}
              </div>
            );
          })}
        </Select>,
        div,
      );
      const input = document.querySelector('.myInput');
      Simulate.keyDown(input, { keyCode: 40 });
      expect(document.querySelector('.selectListWrapper')).not.toEqual(null);
      Simulate.keyDown(input, { keyCode: 9 });
      expect(document.querySelector('.selectListWrapper')).toEqual(null);
      Simulate.keyDown(input, { keyCode: 38 });
      expect(document.querySelector('.selectListWrapper')).not.toEqual(null);
      Simulate.keyDown(input, { keyCode: 27 });
      expect(document.querySelector('.selectListWrapper')).toEqual(null);
      Simulate.keyDown(input, { keyCode: 32 });
      expect(document.querySelector('.selectListWrapper')).not.toEqual(null);
      Simulate.keyDown(input, { keyCode: 13 });
      expect(document.querySelector('.selectListWrapper')).toEqual(null);
      Simulate.keyDown(input, { keyCode: 13 });
      expect(document.querySelector('.selectListWrapper')).not.toEqual(null);
      expect(document.querySelectorAll('li')[0].style['background-color']).not.toEqual('');
      Simulate.keyDown(input, { keyCode: 40 });
      Simulate.keyDown(input, { keyCode: 40 });
      Simulate.keyDown(input, { keyCode: 40 });
      Simulate.keyDown(input, { keyCode: 40 });
      Simulate.keyDown(input, { keyCode: 40 });
      expect(document.querySelectorAll('li')[3].style['background-color']).not.toEqual('');
      Simulate.keyDown(input, { keyCode: 38 });
      Simulate.keyDown(input, { keyCode: 38 });
      Simulate.keyDown(input, { keyCode: 38 });
      Simulate.keyDown(input, { keyCode: 38 });
      expect(document.querySelectorAll('li')[0].style['background-color']).not.toEqual('');
      Simulate.keyDown(input, { keyCode: 32 });
      expect(document.querySelector('.selectListWrapper')).toEqual(null);
      Simulate.keyDown(input, { keyCode: 27 });
      expect(document.querySelector('.selectListWrapper')).toEqual(null);
      Simulate.keyDown(input, { keyCode: 9 });
      expect(document.querySelector('.selectListWrapper')).toEqual(null);
      document.body.removeChild(div);
    });
    it('change input value', () => {
      const wrapper = mount(
        <Select isSearchable={true} isClearable={true}>
          {optionList.map(item => {
            return (
              <div key={item.value} value={item.value}>
                {item.value}
              </div>
            );
          })}
        </Select>,
      );
      const input = wrapper.find('input').at(0);
      input.simulate('change', {target: {value: 'r'}})
      const list = wrapper.find('.selectListWrapper').at(0);
      expect(wrapper.find('.clearAllIcon').at(0).prop('style')).toHaveProperty('visibility', '');
      expect(list.exists()).toEqual(true);
      expect(wrapper.find('li').children().at(0).text()).toEqual('Red');
      input.simulate('change', {target: {value: ''}})
      expect(wrapper.find('.clearAllIcon').at(0).prop('style')).toHaveProperty('visibility', 'hidden');
    });
  });
});
