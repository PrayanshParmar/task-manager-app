import React from "react";

interface ModelProps {
  body: React.ReactElement;
}

const Model: React.FC<ModelProps> = ({ body }) => {
  return (
    <>
      <div
        className=" fixed w-full h-full bg-transparent backdrop-blur bg-blend-normal overflow-x-hidden
overflow-y-auto z-50 inset-0 flex justify-center items-center "
      >
        <div className=" max-w-[300px] text-blue-500 border rounded-xl px-[14px] shadow-md shadow-blue-500 border-blue-500 w-full max-h-[440px] h-fit bg-black">
          <div className=" my-2 flex flex-col justify-start gap-3 ">{body}</div>
        </div>
      </div>
    </>
  );
};

export default Model;
