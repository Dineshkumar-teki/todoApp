import { FaPlus } from "react-icons/fa";
import Popup from "reactjs-popup";
import CreateTodoTab from "./CreateTodoTab";
import TodoContext from "../context/todoContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("jwtToken");
    navigate("/sign-in");
  };
  return (
    <TodoContext.Consumer>
      {(value) => {
        const { profileData } = value;
        return (
          <nav className="flex justify-between items-center min-h-[10vh] border-b border-gray-300 px-5">
            <h1 className="text-lg font-semibold bg-gradient-to-r from-teal-400 to-blue-500 hover:bg-gradient-to-l px-3 py-1 rounded-md text-white ">
              todo
            </h1>
            <div className="flex items-center gap-3">
              <Popup
                modal
                trigger={
                  <button
                    className="relative font-semibold text-lg flex items-center gap-1 shadow-inner hover:before:content-['Create'] bg-gradient-to-r from-teal-400 to-purple-400 bg-teal-500 text-white p-2 rounded-full"
                    type="button"
                  >
                    <FaPlus className="w-[30px] h-[30px] border-2 p-1 rounded-full hover:rotate-90 duration-500" />
                  </button>
                }
              >
                {(close) => <CreateTodoTab close={close} />}
              </Popup>
              <div
                className="relative w-[40px] h-[40px] object-scale-down border-2 rounded-full"
                onClick={() => {
                  setShowProfile(!showProfile);
                }}
              >
                <img
                  className="rounded-full"
                  src={
                    profileData.profilePicture
                      ? profileData.profilePicture
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  alt="profile"
                />
                {showProfile && (
                  <div className="absolute flex flex-col gap-2 left-[-100px] z-10 text-white rounded-md top-[10vh] bg-slate-400 w-32 py-3 px-1">
                    <button className="hover:bg-slate-600 py-1 rounded-md">
                      Profile
                    </button>
                    <button
                      className="cursor-pointer hover:bg-slate-600 py-1 rounded-md"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </nav>
        );
      }}
    </TodoContext.Consumer>
  );
};

export default Header;
