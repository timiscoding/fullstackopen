import { useState, useEffect, useRef } from "react";
import { ResizeObserver as Polyfill } from "@juggle/resize-observer";

const ResizeObserver = window.ResizeObserver || Polyfill;

const useMeasure = () => {
  const [bounds, set] = useState({ width: 0, height: 0 });
  const [ro] = useState(
    () =>
      new ResizeObserver(([entry]) => {
        let width, height;
        if (entry.borderBoxSize) {
          ({ inlineSize: width, blockSize: height } = entry.borderBoxSize);
        } else {
          ({ width, height } = entry.contentRect);
        }
        set({ width, height });
      })
  );
  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      ro.observe(ref.current);
    }
    return () => ro.disconnect();
  }, [ro]);

  return [ref, bounds];
};

export default useMeasure;
