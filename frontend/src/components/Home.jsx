import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Header";
import Sidebar from "./Sidebar";
import TodoCard from "./TodoCard";
import TodoContext from "../context/todoContext";
import Lottie from "lottie-react";
import anime1 from "../assets/anime1.json";
import Cookies from "js-cookie";
import { InfinitySpin } from "react-loader-spinner";

const Home = () => {
  const [hideDoneTasks, setHideDoneTasks] = useState(false);
  const [activeTabItems, setActiveTabs] = useState([]);

  const navigate = useNavigate();

  const selectTabItem = (id) => {
    if (activeTabItems.includes(id)) {
      const updatedActiveTabItems = activeTabItems.filter(
        (eachTab) => eachTab !== id
      );
      setActiveTabs([...updatedActiveTabItems]);
    } else {
      setActiveTabs([...activeTabItems, id]);
    }
  };

  const onChangeHideDoneTasks = () => {
    setHideDoneTasks(!hideDoneTasks);
  };

  const displayTaskList = (todoList) => {
    const filteredList = todoList.filter((eachTask) => {
      const activeTabItemsSet = new Set(activeTabItems);
      const typeOfTaskSet = new Set(eachTask.tags);
      return activeTabItemsSet.isSubsetOf(typeOfTaskSet);
    });
    if (hideDoneTasks) {
      const updatedTodoList = filteredList.filter(
        (eachTask) => !eachTask.status
      );
      return updatedTodoList.map((eachTask) => (
        <TodoCard key={eachTask._id} eachTask={eachTask} />
      ));
    }

    return filteredList.map((eachTask) => (
      <TodoCard key={eachTask._id} eachTask={eachTask} />
    ));
  };

  useEffect(() => {
    if (Cookies.get("jwtToken") === undefined) {
      navigate("/sign-in");
    }
  });

  return (
    <TodoContext.Consumer>
      {(props) => {
        const { todoList, loader } = props;
        return (
          <>
            <Navbar />
            <section className="flex flex-col lg:flex-row min-h-[90vh]">
              <aside className="border-b md:border-b-none border-r p-5 md:p-3  flex flex-col gap-4 min-w-[20vw]">
                <Sidebar
                  selectTabItem={selectTabItem}
                  activeTabItems={activeTabItems}
                />
                <div className="flex gap-2  items-center">
                  <input
                    id="hideDoneTasks"
                    type="checkbox"
                    onChange={onChangeHideDoneTasks}
                  />
                  <label
                    htmlFor="hideDoneTasks"
                    className={`text-black font-semibold ${
                      hideDoneTasks && "text-gray-500"
                    }`}
                  >
                    Hide done tasks
                  </label>
                </div>
                <div className="hidden lg:block w-[200px] self-center">
                  <Lottie animationData={anime1} loop={true} />
                </div>
              </aside>
              <section className="w-screen md:min-w-[75vw]  p-5 md:p-10">
                {loader ? (
                  <div className="loader flex justify-center items-center min-h-[70vh]">
                    <InfinitySpin
                      visible={true}
                      width="200"
                      color="blue"
                      ariaLabel="infinity-spin-loading"
                    />
                  </div>
                ) : todoList.length ? (
                  <ul className="columns-2 max-md:columns-1 *:break-inside-avoid mb-4 list-none">
                    {displayTaskList(todoList)}
                  </ul>
                ) : (
                  <div className="emptyTodoList">
                    <img
                      src="https://img.freepik.com/free-vector/tiny-man-woman-standing-near-list-couple-ticking-off-items-check-list-flat-vector-illustration-daily-routine-busy-lifestyle-concept-banner-website-design-landing-web-page_74855-22067.jpg?w=740&t=st=1724776178~exp=1724776778~hmac=95d266aa99f7f5b703f43501eb7d88e9434e59e79c71b302a9ec15a4041d49cb"
                      alt="emptyTodoList"
                    />
                    <p className="font-xl text-slate-600">
                      Your to-do list is clear and ready for new tasks. Let’s
                      get started on something great!
                    </p>
                  </div>
                )}
              </section>
            </section>
          </>
        );
      }}
    </TodoContext.Consumer>
  );
};

export default Home;
