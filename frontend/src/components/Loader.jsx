import { InfinitySpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="loader flex justify-center items-center min-h-[70vh]">
      <InfinitySpin
        visible={true}
        width="200"
        color="blue"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
};

export default Loader;
