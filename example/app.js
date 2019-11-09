import React, { useEffect, useState, memo } from 'react';
import ReactDom from 'react-dom';
import Select from 'components/index';
if (module.hot) {
  module.hot.accept();
}

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

const App = memo(() => {
  const options = useState(null);
  const stateSelect = useState('');
  const stateSelect2 = useState('');
  const stateIsLoading = useState(false);
  const attribute = {
    placeholder: '请选择',
    select: stateSelect[0],
    noOptionsText: '无匹配选项',
    loadingText: '加载中',
    style: { width: '300px', maxHeight: '200px' },
    optionsIsLoading: stateIsLoading[0],
    onSelectChange: val => stateSelect[1](val),
    isSearchable: true,
    isClearable: true,
  };
  const attribute2 = {
    select: stateSelect2[0],
    style: { width: '300px', maxHeight: '200px' },
    onSelectChange: val => stateSelect2[1](val),
    isClearable: true,
  };
  useEffect(() => {
    stateIsLoading[1](true);
    setTimeout(() => {
      options[1](optionList);
      stateSelect[1]('Slate');
      stateIsLoading[1](false);
    }, 3000);
  }, []);
  return (
    <div>
      <h1>Simple Select</h1>
      <Select {...attribute2}>
        {optionList.map(item => {
          return (
            <div key={item.value} value={item.value} disabled={item.isDisabled} color={item.color}>
              {item.value}
            </div>
          );
        })}
      </Select>
      <br />
      <br />
      <br />
      <h1>Searchable Select</h1>
      <Select {...attribute}>
        {options[0] &&
          options[0].map(item => {
            return (
              <div key={item.value} value={item.value} disabled={item.isDisabled} color={item.color}>
                {item.value}
              </div>
            );
          })}
      </Select>
    </div>
  );
});

const render = Component => {
  ReactDom.render(<Component />, document.getElementById('app'));
};

render(App);
