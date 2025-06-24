'use client';

import { useState, useEffect } from 'react';
import { NavDesktop } from './NavDesktop';
import NavMobile   from './NavMobile';

export default function NavCombined() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 772);
    };

    // Initial check
    handleResize();

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {isMobile ? <NavMobile /> : <NavDesktop />}
    </>
  );
}
