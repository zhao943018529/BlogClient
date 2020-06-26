import * as React from 'react';
import { throttle } from 'lodash';

interface ScrollProps {
  x: number;
  y: number;
}

export default function useWindowScroll(
  callback: (current: ScrollProps, prev: ScrollProps) => void
) {
  const [rect, setWinRect] = React.useState<{ x: number; y: number }>(() => {
    return {
      y: window.pageYOffset,
      x: window.pageXOffset,
    };
  });

  const func = React.useCallback(
    throttle(() => {
      const x = window.pageXOffset;
      const y = window.pageYOffset;
      setWinRect((prev) => {
        if (x !== prev.x || y !== prev.y) {
          const current = { x, y };
          callback(current, prev);
          return current;
        }
        return prev;
      });
    }, 100),
    []
  );

  React.useEffect(() => {
    window.addEventListener('scroll', func);
    return () => window.removeEventListener('scroll', func);
  }, []);

  return rect;
}
