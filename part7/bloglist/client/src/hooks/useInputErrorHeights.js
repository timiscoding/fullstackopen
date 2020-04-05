import { useState, useEffect } from "react";

const useInputErrorHeights = (refs, errors) => {
  const [heights, setHeights] = useState({});
  useEffect(() => {
    let shouldUpdate = false;
    const newHeights = Object.keys(refs).reduce((res, id) => {
      const newHeight = errors[id] ? refs[id].current.scrollHeight : 0;
      if (newHeight !== heights[id]) {
        shouldUpdate = true;
      }
      return {
        ...res,
        [id]: newHeight
      };
    }, {});
    if (shouldUpdate) {
      setHeights(newHeights);
    }
  }, [errors, refs, heights]);
  return heights;
};

export default useInputErrorHeights;
