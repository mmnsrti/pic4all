import React, { useEffect, useRef, useState } from "react";
import { HiMenu } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";
import { Sidebar, Userprofile } from "../components";
import { client } from "../client";
import logo from "../assets/Logo.png";
import Pins from "./Pins";
import { userQuery } from "../utils/data";
import { fetch } from "../utils/fetch";

const Home = () => {
  const [ToggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);
  const userInfo = fetch();
  useEffect(() => {
    const query = userQuery(userInfo?.googleId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);
  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex bg-gradient-to-r from-purple-100 to-pink-100 md:flex-row flex-col h-screen transaction-height duration-100 ease-out ">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar user={user && user} />
      </div>
      <div className="flex md:hidden flex-row ">
        <div className="p-4 w-full flex flex-row justify-between item-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          />
          <Link to="/">
            <img src={logo} alt="logo" className="w-14" />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="logo" className="w-14" />
          </Link>
        </div>
        {ToggleSidebar && (
          <div className="fixed w-3/5 	bg-gradient-to-r from-purple-300 to-pink-300 to-blue-500 rgb(124 45 18); h-screen overflow-y-auto shadow-md z-10 animate-slide-in ">
            <div className="absoulute w-full flex justify-end p-2 item-center ">
              <AiOutlineClose
                fontSize={20}
                className="cursor-pointer flex"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar user={user && user} closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>
      <div className="pb-4 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<Userprofile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
