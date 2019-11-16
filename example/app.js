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
  const stateSelect3 = useState('');
  const stateIsLoading = useState(false);
  const stateBgColor = useState('');
  const attribute = {
    placeholder: '请选择',
    select: stateSelect[0],
    noOptionsText: '无匹配选项',
    loadingText: '加载中',
    selectCustomStyle: { width: '300px' },
    optionsCustomStyle: { maxHeight: '200px' },
    optionsIsLoading: stateIsLoading[0],
    onSelectChange: val => stateSelect[1](val),
    isSearchable: true,
    isClearable: true,
  };
  const attribute2 = {
    select: stateSelect2[0],
    selectCustomStyle: { width: '300px', selectColor: stateBgColor[0], selectBorderRadius: '0', selectBorderColor: 'black', activeBorderColor: 'red' },
    optionsCustomStyle: { maxHeight: '200px', optionsBorderColor: 'black', optionsBorderRadius: '0', optionHoverBgColor: '#eee', optionActiveBgColor: 'pink', optionActiveColor: 'blue'},
    onSelectChange: val => stateSelect2[1](val),
    selectPreContent: <div style={{ width: '20px', height: '14px', backgroundColor: stateBgColor[0], marginRight: '10px' }}></div>,
    isClearable: true,
  };
  const attribute3 = {
    select: stateSelect3[0],
    selectCustomStyle: { width: '300px' },
    optionsCustomStyle: { maxHeight: '200px' },
    onSelectChange: val => stateSelect3[1](val),
  };
  useEffect(() => {
    let color;
    optionList.forEach(v => {
      v.value === stateSelect2[0] ? (color = v.color) : '';
    });
    stateBgColor[1](color);
  }, [stateSelect2[0]]);
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
      <Select {...attribute3}>
        {optionList.map(item => {
          return (
            <div key={item.value} value={item.value}>
              {item.value}
            </div>
          );
        })}
      </Select>
      <br />
      <br />
      <br />
      <h1>Custom Select</h1>
      <Select {...attribute2}>
        {optionList.map(item => {
          return (
            <div key={item.value} value={item.value} disabled={item.isDisabled} color={item.color}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '20px', height: '14px', backgroundColor: item.color, marginRight: '10px' }}></div>
                {item.value}
              </div>
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
              <div key={item.value} value={item.value} disabled={item.isDisabled}>
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
