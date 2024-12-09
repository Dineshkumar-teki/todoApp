import { BsThreeDots } from "react-icons/bs";
import { useState } from "react";
import TodoContext from "../context/todoContext";
import Popup from "reactjs-popup";
import EditTodoItem from "./EditTodoTab";
import { FaTrash, FaUserEdit } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";

const taskTypes = [
  { id: "WORK", type: "work", color: "#D2CEFF", active: false },
  { id: "STUDY", type: "study", color: "#D1E5F7", active: false },
  {
    id: "ENTERTAINMENT",
    type: "entertainment",
    color: "#FFCECE",
    active: false,
  },
  { id: "FAMILY", type: "family", color: "#DAF2D6", active: false },
];

const TodoCard = ({ eachTask }) => {

  const { _id, title, description, tags, status } = eachTask;
  const typeOfTasks = taskTypes.filter((eachTask) =>
    tags.includes(eachTask.id)
  );

  const isTaskDone = status ? "taskDone" : null;
  return (
    <TodoContext.Consumer>
      {(props) => {
        const { statusUpdateRequest, handleDeleteRequest } = props;

        const onChangeTaskStatus = () => {
          const todo = { _id, title, description, tags, status: !status };
          statusUpdateRequest(_id, todo);
        };

        const onTodoDelete = () => {
          handleDeleteRequest(_id);
        };

        return (
          <li className="bg-yellow-200 p-3 rounded-lg flex flex-col gap-5 mb-5 hover:translate-y-[-8px] shadow-inner shadow-orange-500 transition-all duration-700 ease-in-out justify-between">
            <div className="flex justify-between items-center relative">
              <h1
                className={`text-2xl font-semibold ${
                  isTaskDone && "line-through"
                }`}
              >
                {title}
              </h1>
              <div className="flex flex-row-reverse gap-2 ">
                <button
                  className="bg-orange-500 hover:bg-orange-600 shadow-inner w-10 h-10 flex items-center justify-center rounded-full"
                  onClick={onTodoDelete}
                >
                  <FaTrash className="text-sm text-white" />
                </button>
                <Popup
                  modal
                  trigger={
                    <button className="bg-orange-500 hover:bg-orange-600 w-10 h-10 flex items-center justify-center shadow-inner p-3 rounded-full">
                      <MdModeEditOutline className="text-md text-white" />
                    </button>
                  }
                >
                  {(close) => (
                    <EditTodoItem
                      todoItem={eachTask}
                      close={close}
                    />
                  )}
                </Popup>
              </div>
            </div>
            <p className={`${isTaskDone && "line-through"}`}>{description}</p>
            <div className="flex justify-between items-center">
              <ul className="flex gap-2">
                {typeOfTasks.map((eachTask) => (
                  <div
                    key={eachTask.id}
                    style={{ backgroundColor: eachTask.color }}
                    className="w-9 h-9 rounded-full"
                  ></div>
                ))}
              </ul>
              <div className="flex items-center gap-2 font-semibold">
                <input
                  type="checkbox"
                  id={_id}
                  checked={status}
                  onChange={onChangeTaskStatus}
                />
                <label htmlFor={_id} style={{ color: status ? "gray" : "" }}>
                  Done
                </label>
              </div>
            </div>
          </li>
        );
      }}
    </TodoContext.Consumer>
  );
};

export default TodoCard;
