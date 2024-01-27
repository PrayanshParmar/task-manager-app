import React, { useState } from "react";
//@ts-ignore
import logo from "../assets/logo.png";
import { BsMenuDown, BsMenuUp } from "react-icons/bs";

const Navbar = () => {
  const [toggle, setToggle] = useState(true);

  const handleToogle = () => {
    setToggle(!toggle);
  };
  return (
    <>
      <div className=" w-full h-24 flex justify-center ">
        <nav className="h-full m-auto px-3   max-w-[1330px] w-full flex flex-row items-center justify-between">
          <div className=" flex flex-row text-sm items-center gap-4">
            <a href="/" className=" flex items-center gap-1">
              <img src={logo} alt="logo" className=" w-[44px] h-[44px]  " />
              <span className=" text-blue-500 text-lg font-serif">TASKIFY</span>
            </a>

            <a className=" max-sm:hidden" href="/#">
              <span className="hover:text-blue-500">ABOUT</span>
            </a>
          </div>
          <div className=" max-sm:hidden flex flex-row items-center gap-4 text-sm ">
            <a href="/login">
              <span className="hover:text-blue-500">LOG IN</span>
            </a>
            <a href="/register">
              <button className=" w-[140px] h-[40px] bg-transparent border border-blue-500 text-center rounded-sm text-blue-500 hover:bg-blue-500 hover:text-white ">
                SIGN UP FREE
              </button>
            </a>
          </div>
          <div className="sm:hidden">
            <button onClick={handleToogle}>
              {toggle ? (
                <>
                  <BsMenuDown className=" w-[24px] h-[24px] text-blue-500" />
                </>
              ) : (
                <>
                  <BsMenuUp className=" w-[24px] h-[24px] text-blue-500" />
                </>
              )}
            </button>
            <div
              id="dropdowm-menu"
              className={` ${
                toggle
                  ? "hidden"
                  : " border-b border-blue-400 bg-zinc-950 text-white   w-full h-fit pb-4  flex flex-col items-center text-center fixed top-[73px] right-1 z-50 "
              } `}
            >
              <ul className="text-sm ">
                <li className=" hover:text-blue-400 pt-4">
                  <a href="/#">ABOUT</a>
                </li>
                <li className=" hover:text-blue-400 pt-4">
                  <a href="/login">LOG IN</a>
                </li>
                <li className=" pt-4">
                  <a href="/register">
                    <button className="bg-transparent h-9 w-28 border border-blue-500 text-center rounded-sm text-blue-500 hover:bg-blue-500 hover:text-white ">
                      <span>SIGN UP FREE</span>
                    </button>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div className={` ${toggle ? " hidden " : " h-[130px] "} `}></div>
    </>
  );
};

export default Navbar;
