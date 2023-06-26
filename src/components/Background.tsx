import { FC } from "react";

const Background: FC = () => {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-gray-400 backdrop-filter bg-opacity-10 z-1 backdrop-blur-sm"></div>
      <div className="fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-80 h-80 rounded-full bg-emerald-300 z-0 blur-[100px] opacity-50 dark:bg-indigo-600"></div>
    </>
  );
};

export default Background;
