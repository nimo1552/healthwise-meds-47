
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    // Only scroll to top if the path has changed
    if (prevPathRef.current !== pathname) {
      window.scrollTo({
        top: 0,
        behavior: "instant" // Use instant instead of smooth for better performance
      });
      prevPathRef.current = pathname;
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
