import { useState, useEffect } from "react";
import MEDIA_QUERY_BREAK_POINT from "@/constants/mediaQueryBreakPoint";

export default function useIsMobile() {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < MEDIA_QUERY_BREAK_POINT.DESKTOP_MIN_WIDTH) {
        setIsMobileView(true);
      } else {
        setIsMobileView(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobileView;
}
