import React, { useState } from "react";
import "./menu.css";
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "./button";

const Hamburger_Menu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };
  return (
    <div className="md:hidden">
      <label className="flex flex-col w-[30px] cursor-pointer">
        <input type="checkbox" id="check" onChange={handleMenuClick} />
        <span></span>
        <span></span>
        <span></span>
      </label>

      {showMenu && (
        <div className="fixed animate-in slide-in-from-top-5 slide-out-to-top-5 z-0 w-6/12 right-0 h-full pr-2">
          <ul className="absolute text-right text-xl font-black bg-white border-b border-zinc-200 shadow-xl grid w-full gap-3 px-10 pt-10 pb-8">
          <li>
            <a href="/dashboard">Dashboard</a>
          </li>
          <li>
            <a href="/leads">Leads</a>
          </li>
          <li>
            <a href="/deals">Deals</a>
          </li>
          <SignOutButton>
                    <Button>Signout</Button>
                  </SignOutButton>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Hamburger_Menu;
