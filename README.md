# simple-react-select

[![npm](https://img.shields.io/npm/v/simple-react-select)](https://www.npmjs.com/package/simple-react-select)
[![GitHub](https://img.shields.io/github/license/Hentaitang/simple-react-select)](https://github.com/Hentaitang/simple-react-select/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/Hentaitang/simple-react-select.svg?branch=master)](https://travis-ci.org/Hentaitang/simple-react-select)
[![Coverage Status](https://coveralls.io/repos/github/Hentaitang/simple-react-select/badge.svg?branch=master)](https://coveralls.io/github/Hentaitang/simple-react-select?branch=master)

## [Home Page](https://hentaitang.github.io/simple-react-select/)
Test will finish soooooooooooooooooooooooooooooooooooooooooooooooooon!  ( •̀ᄇ• ́)ﻭ✧

## Install

```$xslt
$ yarn add simple-react-select

// or

$ npm install simple-react-select --save
```

## How to use

### Usage

Then you need to import its component and css:

```$xslt
import Select from 'simple-react-select'
import 'simple-react-select/lib/simple-react-select.css'
```

#### Make sure you have react@16.8.6 installed.

```$xslt
"peerDependencies": {
  "react": "^16.8.6",
  "react-dom": "^16.8.6"
}
```

## Example

Now, let's place component in your Web APP!

```$js
import React, {memo, useState} from 'react';
import Select from 'simple-react-select';
import 'simple-react-select/lib/simple-react-select.css'

const App = memo(() => {
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
  const stateSelect = useState('');
  const attribute = {
    select: stateSelect[0],
    onSelectChange: val => stateSelect[1](val),
  };
  return (
    <div>
      <Select {...attribute}>
        {optionList.map(item => {
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
```

If you wanna explore more usages, here's a playground on [CodeSandBox.io](https://codesandbox.io/s/wispy-river-5dv7b).

## Attribute

  | Props | Description | Type | Opt | Default |
  | ---- |:----:|:----:|:----:|:----:|
  | placeholder | change the text displayed when no option is selected | string | — |  —  |
  | select | control the current value | string | — |  — |
  | noOptionsText | Text to display when there are no options | string | — | — |
  | loadingText | Text to display when loading | string |  —   |—|
  | isLoadingIcon | need loading icon or not when loading | boolean |  —   |true|
  | selectCustomStyle | select custom style | object |   { width: '300px', selectColor: 'yellow', selectBorderRadius: '0', selectBorderColor: 'black', activeBorderColor: 'red' }    |   {}    |
  | optionsCustomStyle | options custom style | object |   { maxHeight: '200px', optionsBorderColor: 'black', optionsBorderRadius: '0', optionHoverBgColor: '#eee', optionActiveBgColor: 'pink', optionActiveColor: 'blue'}    |   {}    |
  | optionsIsLoading | loading control | boolean |  —   |   false    |
  | onSelectChange | subscribe to change events | function |  —   | (res) => {} |
  | isSearchable | allow the user to search for matching options | boolean |  —   |   false    |
  | isClearable | clear select or input value | boolean |  —   |   false    |

## LICENSE

[MIT](https://github.com/Hentaitang/simple-react-select/blob/master/LICENSE)
