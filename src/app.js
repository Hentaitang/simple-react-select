import React, { useEffect, useState, memo } from 'react';
import ReactDom from 'react-dom';
// import Select from './index';
// import Select from '../dist/index.bundle.js';
import { Select } from '../lib/simple-react-select.js';

console.log(Select);
// if (module.hot) {
//   module.hot.accept();
// }

const App = memo(() => {
  let arr = useState(null);
  const stateSelect = useState('');
  const stateIsLoading = useState(false);
  const attribute = {
    placeholder: '请选择',
    select: stateSelect[0],
    noOptionsText: '无匹配选项',
    loadingText: '加载中',
    loadingIcon: true,
    style: { width: '300px', maxHeight: '200px' },
    optionsIsLoading: stateIsLoading[0],
    onSelectChange: val => stateSelect[1](val),
  };
  useEffect(() => {
    stateIsLoading[1](true);
    setTimeout(() => {
      arr[1]([
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
      ]);
      stateSelect[1]('Slate');
      stateIsLoading[1](false);
    }, 3000);
  }, []);
  return (
    <div>
      <Select {...attribute}>
        {arr[0] &&
          arr[0].map(item => {
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