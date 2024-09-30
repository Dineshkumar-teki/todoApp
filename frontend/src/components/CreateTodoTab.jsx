import { useState } from "react";
import TodoContext from "../context/todoContext";

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

const CreateTodoTab = (props) => {
  const { close } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const onChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const onChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  return (
    <TodoContext.Consumer>
      {(props) => {
        const { handlePostRequest } = props;
        const onSubmitForm = (event) => {
          event.preventDefault();
          const todo = {
            title,
            description,
            tags,
            status: false,
          };
          handlePostRequest(todo);
          setTitle("");
          setDescription("");
          setTags([]);
          close();
        };
        return (
          <section className="bg-white border border-slate-400 p-10 rounded-xl min-w-[75vw]">
            <form onSubmit={onSubmitForm} className="flex flex-col">
              <div className="flex justify-between mb-6">
                <button
                  type="button"
                  className="bg-gradient-to-r from-red-500 to-orange-400 px-8 py-2 rounded-lg text-white font-semibold"
                  onClick={() => close()}
                >
                  Cancel
                </button>
                <button type="submit" className="bg-gradient-to-r from-teal-400 to-blue-400 px-10 py-2 rounded-lg text-white font-semibold">
                  Add
                </button>
              </div>
              <label className="font-semibold" htmlFor="title">Title</label>
              <input
                id="title"
                className="border border-slate-400 p-2 rounded-lg outline-none focus:border-teal-400 mt-2 mb-5"
                placeholder="add a title ..."
                value={title}
                onChange={onChangeTitle}
              />
              <label className="font-semibold" htmlFor="description">Description</label>
              <textarea
                rows={5}
                id="description"
                className="border border-slate-400 p-2 rounded-lg outline-none focus:border-teal-400 mt-2 mb-5"
                placeholder="add a description ..."
                value={description}
                onChange={onChangeDescription}
              />
              <h3 className="font-semibold mb-3" >Tags</h3>
              <ul className="flex justify-between gap-3 flex-wrap">
                {taskTypes.map((eachTag) => {
                  const onClickTag = () => {
                    if (tags.includes(eachTag.id)) {
                      const updatedTags = tags.filter(
                        (eachId) => eachId !== eachTag.id
                      );
                      setTags(updatedTags);
                    } else {
                      setTags([...tags, eachTag.id]);
                    }
                  };
                  return (
                    <li key={eachTag.id}>
                      <button
                        type="button"
                        className={`flex gap-2 items-center p-2 rounded-lg ${
                          tags.includes(eachTag.id) ? "border shadow-lg" : null
                        }`}
                        onClick={onClickTag}
                      >
                        <div className="w-10 h-10 rounded-full" style={{ backgroundColor: eachTag.color }}></div>
                        <p className="font-medium" >{eachTag.type}</p>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </form>
          </section>
        );
      }}
    </TodoContext.Consumer>
  );
};

export default CreateTodoTab;
