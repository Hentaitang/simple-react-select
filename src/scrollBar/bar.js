import React, { memo, useState, useMemo, useEffect, useCallback, useRef } from 'react';
import './bar.scss';

const component = memo(props => {
  const { children, style } = props;
  const stateBarHeight = useState(0);
  const statetransformY = useState(0);
  const scrolBarRef = useRef(null);
  const stateIsShowBar = useState(false);
  const stateIsClickBar = useState(false);
  useEffect(() => {
    const childrenHeight = document.querySelector(`.scrollBarWrap ${children.type}`).clientHeight;
    const wrapHeight = scrolBarRef.current.clientHeight;
    stateIsShowBar[1](false);
    if (style.maxHeight && childrenHeight > wrapHeight) {
      const persentage = wrapHeight / childrenHeight;
      stateBarHeight[1](persentage * wrapHeight - 3);
      stateIsShowBar[1](true);
    }
  }, [children]);
  const handleScroll = useCallback(() => {
    const wrapHeight = scrolBarRef.current.clientHeight;
    const childrenHeight = document.querySelector(`.scrollBarWrap ${children.type}`).clientHeight;
    const childTop = document.querySelector(`.scrollBarWrap ${children.type}`).getBoundingClientRect().top;
    const childWrapTop = document.querySelector('.scrollBarWrap').getBoundingClientRect().top;
    const scrollTop = ((childWrapTop - childTop) / childrenHeight) * wrapHeight;
    statetransformY[1](scrollTop);
  });
  const handleMouseMove = useCallback(e => {
    console.log(e.clientY);
    statetransformY[1](e.clientY - 70 + 10)
  });
  useEffect(() => {
    stateIsClickBar[0] && document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [stateIsClickBar[0]]);
  return (
    <div className={'scrollBar'} onScroll={() => handleScroll()} ref={scrolBarRef}>
      <div style={{ marginBottom: '-15px', marginRight: '-15px', maxHeight: style && style.maxHeight ? style.maxHeight : '' }} className={'scrollBarWrap'}>
        {children}
      </div>
      {stateIsShowBar[0] && (
        <div className={'bar isVertical'}>
          <div
            className={'scrollBarThumb'}
            style={{ height: `${stateBarHeight[0]}px`, transform: `translateY(${statetransformY[0]}px)` }}
            onMouseDown={() => stateIsClickBar[1](true)}
            onMouseUp={e => stateIsClickBar[1](false)}
          ></div>
        </div>
      )}
    </div>
  );
});

export default component;
