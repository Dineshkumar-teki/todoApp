import { useState } from "react";
import Navbar from "./Header";
import Sidebar from "./Sidebar";
import TodoCard from "./TodoCard";
import TodoContext from "../context/todoContext";
import Lottie from "lottie-react";
import anime1 from "../assets/anime1.json";
import Loader from "./Loader";
import TodoEmptyState from "./TodoEmptyState";

const Home = () => {
  const [hideDoneTasks, setHideDoneTasks] = useState(false);
  const [activeTabItems, setActiveTabs] = useState([]);

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

              <div className="w-full md:min-w-[75vw] p-5 md:p-10">
                {loader ? (
                  <Loader />
                ) : todoList.length ? (
                  <ul className="columns-2 max-md:columns-1 *:break-inside-avoid mb-4 list-none">
                    {displayTaskList(todoList)}
                  </ul>
                ) : (
                  <TodoEmptyState />
                )}
              </div>
            </section>
          </>
        );
      }}
    </TodoContext.Consumer>
  );
};

export default Home;
