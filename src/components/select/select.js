import React, { memo, useState, useEffect, useCallback, useRef } from 'react';
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
    stateCurrentItemIndex[1](0);
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
      }
      stateIsShowList[1](true);
    } else {
      stateSelectList[1](children);
    }
  }, [stateInputValue[0], children]);
  ///////////////////
  // input keydown //
  ///////////////////
  const handleDownAndUp = useCallback((e, keyCode) => {
    e.preventDefault();
    if (stateSelectList[0]) {
      const judge = keyCode === 38 ? stateCurrentItemIndex[0] > 0 : stateCurrentItemIndex[0] < stateSelectList[0].length - 1;
      if (judge) {
        const listPosition = listRef.current.getBoundingClientRect();
        const listWrapPosition = listWrapRef.current.getBoundingClientRect();
        const difference = keyCode === 38 ? listPosition.top - listWrapPosition.top : listWrapPosition.bottom - listPosition.bottom;
        stateCurrentItemIndex[1](stateCurrentItemIndex[0] + (keyCode === 38 ? -1 : 1));
        if (difference <= listPosition.height) {
          const scroll = listPosition.height - difference + 6;
          listWrapRef.current.scrollBy && listWrapRef.current.scrollBy(0, keyCode === 38 ? -scroll : scroll);
        }
      }
    }
  });
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
        case 40:
          handleDownAndUp(e, e.keyCode);
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
            <svg width="14px" height="14px" viewBox="0 0 1024 1024">
              <path
                d="M511.882596 287.998081h-0.361244a31.998984 31.998984 0 0 1-31.659415-31.977309v-0.361244c0-0.104761 0.115598-11.722364 0.115598-63.658399V96.000564a31.998984 31.998984 0 1 1 64.001581 0V192.001129c0 52.586273-0.111986 63.88237-0.119211 64.337537a32.002596 32.002596 0 0 1-31.977309 31.659415zM511.998194 959.99842a31.998984 31.998984 0 0 1-31.998984-31.998984v-96.379871c0-51.610915-0.111986-63.174332-0.115598-63.286318s0-0.242033 0-0.361243a31.998984 31.998984 0 0 1 63.997968-0.314283c0 0.455167 0.11921 11.711527 0.11921 64.034093v96.307622a31.998984 31.998984 0 0 1-32.002596 31.998984zM330.899406 363.021212a31.897836 31.897836 0 0 1-22.866739-9.612699c-0.075861-0.075861-8.207461-8.370021-44.931515-45.094076L195.198137 240.429485a31.998984 31.998984 0 0 1 45.256635-45.253022L308.336112 263.057803c37.182834 37.182834 45.090463 45.253022 45.41197 45.578141A31.998984 31.998984 0 0 1 330.899406 363.021212zM806.137421 838.11473a31.901448 31.901448 0 0 1-22.628318-9.374279L715.624151 760.859111c-36.724054-36.724054-45.018214-44.859267-45.097687-44.93874a31.998984 31.998984 0 0 1 44.77618-45.729864c0.32512 0.317895 8.395308 8.229136 45.578142 45.411969l67.88134 67.88134a31.998984 31.998984 0 0 1-22.624705 54.630914zM224.000113 838.11473a31.901448 31.901448 0 0 0 22.628317-9.374279l67.88134-67.88134c36.724054-36.724054 45.021826-44.859267 45.097688-44.93874a31.998984 31.998984 0 0 0-44.776181-45.729864c-0.32512 0.317895-8.395308 8.229136-45.578142 45.411969l-67.88134 67.884953a31.998984 31.998984 0 0 0 22.628318 54.627301zM255.948523 544.058589h-0.361244c-0.104761 0-11.722364-0.115598-63.658399-0.115598H95.942765a31.998984 31.998984 0 1 1 0-64.00158h95.996952c52.586273 0 63.88237 0.111986 64.337538 0.11921a31.998984 31.998984 0 0 1 31.659414 31.97731v0.361244a32.002596 32.002596 0 0 1-31.988146 31.659414zM767.939492 544.058589a32.002596 32.002596 0 0 1-31.995372-31.666639v-0.361244a31.998984 31.998984 0 0 1 31.659415-31.970085c0.455167 0 11.754876-0.11921 64.34115-0.11921h96.000564a31.998984 31.998984 0 0 1 0 64.00158H831.944685c-51.936034 0-63.553638 0.111986-63.665624 0.115598h-0.335957zM692.999446 363.0176a31.998984 31.998984 0 0 1-22.863126-54.381656c0.317895-0.32512 8.229136-8.395308 45.41197-45.578141l67.88134-67.884953A31.998984 31.998984 0 1 1 828.693489 240.429485l-67.892177 67.88134c-31.020013 31.023625-41.644196 41.759794-44.241539 44.393262l-0.697201 0.722488a31.908673 31.908673 0 0 1-22.863126 9.591025z"
                p-id="818"
              ></path>
            </svg>
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
          <svg
            width="16px"
            height="16px"
            className="clearAllIcon"
            onClick={e => {
              e.stopPropagation();
              inputRef.current.focus();
              stateInputValue[1]('');
              !isSearchable && stateSelect[1]('');
            }}
            style={{ visibility: (isSearchable ? stateInputValue[0] : stateSelect[0]) ? '' : 'hidden' }}
            viewBox="0 0 1024 1024"
          >
            <path
              d="M685.4 354.8c0-4.4-3.6-8-8-8l-66 0.3L512 465.6l-99.3-118.4-66.1-0.3c-4.4 0-8 3.5-8 8 0 1.9 0.7 3.7 1.9 5.2l130.1 155L340.5 670c-1.2 1.5-1.9 3.3-1.9 5.2 0 4.4 3.6 8 8 8l66.1-0.3L512 564.4l99.3 118.4 66 0.3c4.4 0 8-3.5 8-8 0-1.9-0.7-3.7-1.9-5.2L553.5 515l130.1-155c1.2-1.4 1.8-3.3 1.8-5.2z"
              p-id="1052"
            ></path>
            <path
              d="M512 65C264.6 65 64 265.6 64 513s200.6 448 448 448 448-200.6 448-448S759.4 65 512 65z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
              p-id="1053"
            ></path>
          </svg>
        ) : (
          ''
        )}
        <svg
          width="16px"
          height="16px"
          className="dropdownIcon"
          onClick={e => {
            e.stopPropagation();
            inputRef.current.focus();
            stateInputValue[1]('');
            stateIsShowList[1](!stateIsShowList[0]);
          }}
          viewBox="0 0 1024 1024"
        >
          <path
            d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3 0.1-12.7-6.4-12.7z"
            p-id="935"
          ></path>
        </svg>
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
