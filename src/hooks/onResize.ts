/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react';

const getWidth = (): number => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
const getHeight = (): number =>
  window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

export default function onResize(resizeFunc: Function): [number, number] {
  // save current window width in the state object
  const [width, setWidth] = useState(getWidth());
  const [height, setHeight] = useState(getHeight());

  // in this case useEffect will execute only once because
  // it does not have any dependencies.
  useEffect(() => {
    const resizeListener = (): void => {
      // change width from the state object
      const W = getWidth();
      const H = getHeight();
      setWidth(W);
      setHeight(H);
      resizeFunc({ width: W, height: H });
    };

    // set resize listener
    window.addEventListener('resize', resizeListener);

    // clean up function
    return (): void => {
      // remove resize listener
      window.removeEventListener('resize', resizeListener);
    };
  }, [setWidth, setHeight, resizeFunc]);

  return [width, height];
}
