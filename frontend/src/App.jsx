import { useState, useEffect } from "react";
import TodoContext from "./context/todoContext.js";
import axios from "axios";
import Home from "./components/Home.jsx";
import { useSnackbar } from "notistack";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [profileData, setProfileData] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  const fetchTodosList = async () => {
    setLoader(true);
    await axios
      .get("http://localhost:3000/todos/")
      .then((response) => {
        setLoader(false);
        setTodoList(response.data.todoItems);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error)
      });
  };

  // const fetchProfileData = async () => {
  //   await axios
  //     .get("http://localhost:3000/users/auth/")
  //     .then((response) => {
  //       setProfileData(response.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  useEffect(() => {
    fetchTodosList();
  }, []);

  const handlePostRequest = async (todo) => {
    await axios
      .post("http://localhost:3000/todos", todo)
      .then((response) => {
        enqueueSnackbar("Todo created successfully", { variant: "success" });
        fetchTodosList();
      })
      .catch((error) =>
        enqueueSnackbar(`${error.message}`, { variant: "failure" })
      );
  };

  const handlePutRequest = async (id, todo) => {
    await axios
      .put(`http://localhost:3000/todos/${id}`, todo)
      .then((response) => {
        enqueueSnackbar("Todo updated successfully", { variant: "success" });
        fetchTodosList();
      })
      .catch((error) =>
        enqueueSnackbar(`${error.message}`, { variant: "failure" })
      );
  };

  const handleDeleteRequest = async (id) => {
    await axios
      .delete(`http://localhost:3000/todos/${id}`)
      .then((response) => {
        enqueueSnackbar("Todo deleted successfully", { variant: "success" });
        fetchTodosList();
      })
      .catch((error) =>
        enqueueSnackbar(`${error.message}`, { variant: "failure" })
      );
  };

  const statusUpdateRequest = async (id, todo) => {
    await axios
      .put(`http://localhost:3000/todos/${id}`, todo)
      .then((response) => {
        todo.status && enqueueSnackbar("Great Job", { variant: "success" });
        fetchTodosList();
      })
      .catch((error) =>
        enqueueSnackbar(`${error.message}`, { variant: "failure" })
      );
  };

  const handleProfileData = (data) => {
    setProfileData(data);
  };

  return (
    <TodoContext.Provider
      value={{
        todoList,
        profileData,
        loader,
        setLoader: setLoader,
        handlePostRequest: handlePostRequest,
        handlePutRequest: handlePutRequest,
        handleDeleteRequest: handleDeleteRequest,
        statusUpdateRequest: statusUpdateRequest,
        handleProfileData: handleProfileData,
      }}
    >
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </TodoContext.Provider>
  );
}

export default App;
