import { useEffect } from "react";
import { ResizeObserver as Polyfill } from "@juggle/resize-observer";

const ResizeObserver = window.ResizeObserver || Polyfill;

const useResizeObserver = nodes => {
  useEffect(() => {
    const ro = new ResizeObserver(entries => {
      entries.forEach(entry => {
        const target = nodes.find(node => node.ref.current === entry.target);
        target.cb(entry);
      });
    });

    nodes.forEach(({ ref }) => ro.observe(ref.current));
    return () => ro.disconnect();
  });
};

export default useResizeObserver;
