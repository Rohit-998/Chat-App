import Lottie from "lottie-react";
import a from "@/assets/a.json";

const EmptyChatcontainer = () => {
  return (
    <div className="flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center hidden duration-100 transition-all">
      <div className="h-[200px] w-[200px]">
        <Lottie loop={true} animationData={a}></Lottie>
      </div>
      <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-10 lg:text-4xl text-3xl transition-all duration-300 text-center ">
        <h3 className="poppins-medium">
          Hey <span className="text-purple-500">!</span> Welcome To   
          <span className="text-purple-500"> SayHi </span>
          Chat App
          <span className="text-purple-500">.</span>
        </h3>
      </div>
    </div>
  );
};

export default EmptyChatcontainer;
