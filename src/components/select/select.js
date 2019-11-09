import React, { memo, useState, useEffect, useCallback, useRef } from 'react';
import { SvgIconLoading, SvgIconDrapDown, SvgIconCircleClose } from '../icon/icon.js';
import './select.scss';
const component = memo(({ children, placeholder, select = '', onSelectChange, noOptionsText, optionsIsLoading, loadingText, isLoadingIcon = true, style, isSearchable, isClearable }) => {
  const stateSelect = useState(select);
  const stateInputValue = useState('');
  const stateInputWidth = useState(2);
  const stateIsShowList = useState(false);
  const stateSelectList = useState(null);
  const stateIsfocus = useState(false);
  const selectRef = useRef(null);
  const inputRef = useRef(null);
  const fakeInputRef = useRef(null);
  const stateCurrentItemIndex = useState(0);
  const listWrapRef = useRef(null);
  const listRef = useRef(null);
  const getIndexof = useCallback((value, string) => {
    return value
      .toString()
      .toLowerCase()
      .indexOf(string);
  }, []);
  useEffect(() => {
    stateSelectList[1](children);
  }, [children]);
  ///////////////////
  // click outside //
  ///////////////////
  const outSideClick = useCallback(e => {
    if (selectRef.current && !selectRef.current.contains(e.target)) {
      stateIsShowList[1](false);
      stateIsfocus[1](false);
      stateInputValue[1]('');
    }
  }, []);
  useEffect(() => {
    stateCurrentItemIndex[1](0);
  }, [stateIsShowList[0]]);
  useEffect(() => {
    document.addEventListener('click', outSideClick);
    return () => {
      document.removeEventListener('click', outSideClick);
    };
  }, []);
  useEffect(() => {
    stateSelect[1](select);
  }, [select]);
  useEffect(() => {
    onSelectChange && onSelectChange(stateSelect[0]);
  }, [stateSelect[0]]);
  //////////////////
  // input change //
  //////////////////
  useEffect(() => {
    stateInputWidth[1](fakeInputRef.current.clientWidth ? fakeInputRef.current.clientWidth + 16 : 2);
    if (stateInputValue[0]) {
      if (stateSelectList[0]) {
        const filterArray = [];
        children.forEach(item => {
          getIndexof(item.props.value, stateInputValue[0]) >= 0 ? filterArray.push(item) : '';
        });
        filterArray.sort((prev, cur) => {
          return getIndexof(prev.props.value, stateInputValue[0]) - getIndexof(cur.props.value, stateInputValue[0]);
        });
        stateSelectList[1](filterArray);
        stateCurrentItemIndex[1](0);
      }
      stateIsShowList[1](true);
    } else {
      stateSelectList[1](children);
    }
  }, [stateInputValue[0], children]);
  ///////////////////
  // input keydown //
  ///////////////////
  const handleKeyDown = useCallback(e => {
    if (stateIsShowList[0]) {
      switch (e.keyCode) {
        case 13:
        case 32:
          if (stateSelectList[0]) {
            if (stateSelectList[0].length && stateSelectList[0][stateCurrentItemIndex[0]].props.disabled) return;
            stateIsShowList[1](false);
            stateInputValue[1]('');
            stateSelectList[0].length && stateSelect[1](stateSelectList[0][stateCurrentItemIndex[0]].props.value);
          }
          break;
        case 9:
          stateIsShowList[1](false);
          stateIsfocus[1](false);
          stateInputValue[1]('');
          break;
        case 27:
          stateIsShowList[1](false);
          stateInputValue[1]('');
          break;
        case 38:
          e.preventDefault();
          if (stateSelectList[0]) {
            if (stateCurrentItemIndex[0] > 0) {
              const listPosition = listRef.current.getBoundingClientRect();
              const listWrapPosition = listWrapRef.current.getBoundingClientRect();
              const difference = listPosition.top - listWrapPosition.top;
              stateCurrentItemIndex[1](stateCurrentItemIndex[0] - 1);
              if (difference <= listPosition.height) {
                listWrapRef.current.scrollBy && listWrapRef.current.scrollBy(0, -(listPosition.height - difference + 6));
              }
            }
          }
          break;
        case 40:
          e.preventDefault();
          if (stateSelectList[0]) {
            if (stateCurrentItemIndex[0] < stateSelectList[0].length - 1) {
              const listPosition = listRef.current.getBoundingClientRect();
              const listWrapPosition = listWrapRef.current.getBoundingClientRect();
              const difference = listWrapPosition.bottom - listPosition.bottom;
              stateCurrentItemIndex[1](stateCurrentItemIndex[0] + 1);
              if (difference <= listPosition.height) {
                listWrapRef.current.scrollBy && listWrapRef.current.scrollBy(0, listPosition.height - difference + 6);
              }
            }
          }
          break;
      }
    } else {
      [13, 32, 38, 40].indexOf(e.keyCode) !== -1 ? stateIsShowList[1](true) : '';
      stateIsfocus[1](e.keyCode === 9 ? false : true);
    }
  });
  ///////////////
  // list html //
  ///////////////
  let listHtml;
  if (optionsIsLoading) {
    listHtml = (
      <li className={'loadingItem'}>
        {isLoadingIcon ? (
          <div className={'loadingIcon'}>
            <SvgIconLoading width="14px" height="14px" />
          </div>
        ) : (
          ''
        )}
        {loadingText ? loadingText : 'Loading...'}
      </li>
    );
  } else {
    if (stateSelectList[0] && stateSelectList[0].length) {
      listHtml = stateSelectList[0].map((child, index) => {
        return (
          <li
            style={{
              backgroundColor: stateCurrentItemIndex[0] === index ? '#f5f7fa' : '',
              color: child.props.disabled ? '#d9d9d9' : stateSelect[0] === child.props.value ? '#409eff' : '',
              cursor: child.props.disabled ? 'not-allowed' : '',
            }}
            ref={ref => {
              stateCurrentItemIndex[0] === index ? (listRef.current = ref) : '';
            }}
            className={'selectListItem'}
            key={child.key}
            onClick={() => {
              if (child.props.disabled) return;
              stateIsShowList[1](false);
              stateInputValue[1]('');
              stateSelect[1](child.props.value);
            }}
            onMouseEnter={() => stateCurrentItemIndex[1](index)}
          >
            {child}
          </li>
        );
      });
    } else {
      listHtml = <li className={'noItem'}>{noOptionsText ? noOptionsText : 'No options'}</li>;
    }
  }
  return (
    <div className={'selectWrapper'} ref={selectRef} style={{ width: style && style.width ? style.width : '' }}>
      <div
        className={`inputWrapper ${stateIsfocus[0] ? 'focus' : ''}`}
        style={{ paddingRight: stateInputValue[0] && isClearable ? '60px' : '' }}
        onClick={() => {
          stateIsShowList[1](true);
          stateIsfocus[1](true);
          inputRef.current.focus();
        }}
      >
        <input
          readOnly={!isSearchable}
          className={'myInput'}
          type="text"
          value={stateInputValue[0]}
          ref={inputRef}
          style={{ width: `${stateInputWidth[0]}px` }}
          onChange={e => stateInputValue[1](e.target.value.trim())}
          onFocus={() => stateIsfocus[1](true)}
          onKeyDown={e => handleKeyDown(e)}
        />
        <div ref={fakeInputRef} className={'fakeInput'}>
          {stateInputValue[0]}
        </div>
        {!stateInputValue[0] && stateSelect[0] ? <div className={'selectValue'}>{stateSelect[0]}</div> : ''}
        {!stateInputValue[0] && !stateSelect[0] ? <div className={'placeholder'}>{placeholder ? placeholder : 'Select...'}</div> : ''}
        {isClearable ? (
          <SvgIconCircleClose
            width="16px"
            height="16px"
            className={'clearAllIcon'}
            onClick={e => {
              e.stopPropagation();
              inputRef.current.focus();
              stateInputValue[1]('');
              !isSearchable && stateSelect[1]('');
            }}
            style={{ visibility: (isSearchable ? stateInputValue[0] : stateSelect[0]) ? '' : 'hidden' }}
          />
        ) : (
          ''
        )}
        <SvgIconDrapDown
          width="16px"
          className={'dropdownIcon'}
          height="16px"
          onClick={e => {
            e.stopPropagation();
            inputRef.current.focus();
            stateInputValue[1]('');
            stateIsShowList[1](!stateIsShowList[0]);
          }}
        />
      </div>
      {stateIsShowList[0] ? (
        <div className={'selectListWrapper'} ref={listWrapRef} style={{ maxHeight: style && style.maxHeight ? style.maxHeight : '' }}>
          <ul className={'selectList'}>{listHtml}</ul>
        </div>
      ) : (
        ''
      )}
    </div>
  );
});

export default component;
