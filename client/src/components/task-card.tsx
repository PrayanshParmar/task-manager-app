import React from "react";
import { useNavigate } from "react-router-dom";


interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  due_date: string;

}

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  description,
  due_date,
}) => {
   const redirect  = useNavigate();
  return (
    <>
      <div
        id="card"
        className=" flex flex-col  items-start gap-2 text-left max-w-[350px] w-full h-fit p-3 bg-black border rounded-md border-blue-500  shadow-md shadow-sky-400 "
      >
        <h3 className=" w-full min-h-[32px] line-clamp-1 break-words text-blue-500 text-2xl">{title}</h3>
        <p className="w-full min-h-[72px] text-base text-gray-500 break-words line-clamp-3">
          {description}
        </p>
        <div className=" w-full flex items-center justify-between" >
        <span className=" min-h-6 text-base text-rose-500">{due_date}</span>
        <button
        onClick={() => redirect(`/dashboard/${id}`)}
         className=" w-fit h-fit py-1 px-3 rounded-md bg-blue-500 hover:bg-blue-600 text-white " >Open</button>
        </div>
        
      </div>
    </>
  );
};

export default TaskCard;
