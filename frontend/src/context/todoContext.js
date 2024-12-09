import React from "react";

// const taskTypes = [
//   { id: "WORK", type: "work", color: "#D2CEFF", active: false },
//   { id: "STUDY", type: "study", color: "#D1E5F7", active: false },
//   { id: "ENTERTAINMENT", type: "entertainment", color: "#FFCECE", active: false },
//   { id: "FAMILY", type: "family", color: "#DAF2D6", active: false },
//   { id: "HEALTH", type: "health", color: "#FFD2A5", active: false },
//   { id: "FINANCE", type: "finance", color: "#F7E5D1", active: false },
//   { id: "PERSONAL", type: "personal", color: "#C4F1BE", active: false },
//   { id: "SOCIAL", type: "social", color: "#FDE2E2", active: false },
//   { id: "CHORES", type: "chores", color: "#FFF6A5", active: false },
//   { id: "OTHERS", type: "others", color: "#E3E3E3", active: false },
// ];

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
