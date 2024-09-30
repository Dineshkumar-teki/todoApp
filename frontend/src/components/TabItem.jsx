const TabItem = ({ eachTask, selectTabItem, activeTabItems }) => {
  const { id, type, color } = eachTask;
  const style = {
    backgroundColor: color,
  };
  const activeTabItem = activeTabItems.includes(id) ? "activeTab" : null;

  const onClickTab = () => {
    selectTabItem(id);
  };
  return (
    <li className={`p-2 rounded-md ${activeTabItem && "shadow-lg border"} `}>
      <button className="flex gap-2 items-center w-[100%]" onClick={onClickTab}>
        <span style={style} className="w-8 h-8 rounded-full "></span>
        <p className="text-md font-medium" >{type}</p>
      </button>
    </li>
  );
};

export default TabItem;
