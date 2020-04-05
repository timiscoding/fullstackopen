import { useState, useEffect } from "react";
import { styling } from "../constants";

const useMatchMobile = () => {
  const [isMobile, setIsMobile] = useState();
  useEffect(() => {
    const handleWidthChange = (mql) => {
      if (mql.matches) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    const mql = window.matchMedia(`(${styling.mobileQuery})`);
    mql.addListener(handleWidthChange);
    handleWidthChange(mql);
    return () => mql.removeListener(handleWidthChange);
  }, []);

  return isMobile;
};

export default useMatchMobile;
