import React from "react";

const TodoContext = React.createContext({
  todoList: [],
  profileData: {},
  loader: false,
  setLoader: () => {},
  handlePostRequest: () => {},
  handleDeleteRequest: () => {},
  handlePutRequest: () => {},
  statusUpdateRequest: () => {},
  handleProfileData: () => {},
});

export default TodoContext;
