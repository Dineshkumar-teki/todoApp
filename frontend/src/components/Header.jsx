import { FaPlus } from "react-icons/fa";
import Popup from "reactjs-popup";
import CreateTodoTab from "./CreateTodoTab";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("jwtToken");
    navigate("/sign-in");
  };

  return (
    <nav className="flex justify-between items-center min-h-[10vh] border-b border-gray-300 px-5">
      <h1 className="font-extrabold bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent text-2xl">
        TaskFlow
      </h1>
      <div className="flex items-center gap-3">
        <Popup
          modal
          trigger={
            <button
              className="font-semibold text-lg border border-blue-500 shadow-inner p-1 rounded-full"
              type="button"
            >
              <FaPlus className="w-[30px] h-[30px] border-2 p-1 rounded-full hover:rotate-90 bg-blue-300 shadow-sm ease-in-out duration-500" />
            </button>
          }
        >
          {(close) => <CreateTodoTab close={close} />}
        </Popup>
        <button
          className="bg-blue-500 hover:bg-blue-600 px-4 py-1.5 text-white font-semibold rounded-md"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Header;
