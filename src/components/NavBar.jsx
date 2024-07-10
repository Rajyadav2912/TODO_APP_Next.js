import React from "react";

const NavBar = () => {
  return (
    <div className="flex py-6 flex-wrap justify-around ">
      <h1 className="text-2xl font-semibold cursor-pointer">TODO APP</h1>
      <ul className="flex gap-[40px] text-base cursor-pointer">
        <li>Home</li>
        <li>Product</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </div>
  );
};

export default NavBar;
