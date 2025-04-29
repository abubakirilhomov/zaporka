// src/components/ui/Navbar/NavCombined.jsx
'use client';

import NavDesktop from './NavDesktop';
import NavMobile from './NavMobile';

export default function NavCombined() {
  return (
    <>
      <NavDesktop />
      <NavMobile />
    </>
  );
}