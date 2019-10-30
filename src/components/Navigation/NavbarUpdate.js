import React from "react";
import TopNavigation from "./TopNavigation";
import SideNavigation from "./SideNavigation";

const NavbarUpdate = () => {
  return (
    <div>
      <header>
        <TopNavigation />
      </header>
      <aside>
        <SideNavigation />
      </aside>
    </div>
  );
};

export default NavbarUpdate;
