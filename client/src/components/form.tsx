import React from "react";

interface formProps {
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  error?: React.ReactElement;
}

const Form: React.FC<formProps> = ({
    title,  
    body,
    footer,
    error
}) => {


  return (
    <div className=" max-w-[300px] text-blue-500 border rounded-xl px-[14px] shadow-md shadow-blue-500 border-blue-500 w-full max-h-[440px] h-fit  bg-black">
      <div className=" my-2 flex flex-col justify-start gap-3 ">
        <h2 className="  text-[28px]  ">{title}</h2>
        {error}
        {body}
        {footer}
      </div>
    </div>
  );
};

export default Form;
