import React from "react";

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
  return (
    <>
      <div
        id="card"
        className=" group relative flex flex-col  items-start gap-2 text-left max-w-[350px] w-full h-fit p-3 bg-black border rounded-md border-blue-500  shadow-md shadow-sky-400 "
      >
        <h3 className=" min-h-[32px] text-blue-500 text-2xl">{title}</h3>
        <p className=" min-h-[72px] text-base text-gray-500 break-words line-clamp-3">
          {description}
        </p>
        <span className=" min-h-6 text-base text-rose-500">{due_date}</span>
      </div>
    </>
  );
};

export default TaskCard;
