import TabItem from "./TabItem";

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

const Sidebar = ({ selectTabItem, activeTabItems }) => {
  return (
    <ul className="flex flex-row flex-wrap lg:flex-col gap-4">
      {taskTypes.map((eachTask) => (
        <TabItem
          key={eachTask.id}
          eachTask={eachTask}
          activeTabItems={activeTabItems}
          selectTabItem={selectTabItem}
        />
      ))}
    </ul>
  );
};

export default Sidebar;
