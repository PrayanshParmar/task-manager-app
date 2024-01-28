import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { GoPlus, GoX } from "react-icons/go";
import TaskCard from "../components/task-card";
import { queryClient } from "../App";



const Dashborad = () => {

  const [toggle, setToogle] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [due_date, setDuedate] = useState("");

  const {
    data: tasks,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axios.get(`${String(process.env.API_URL)}/api/v1/tasks`);
      return res;
    },
  });

  const mutation = useMutation({
    mutationFn: (addTask) => {
      return axios.post(`${String(process.env.API_URL)}/api/v1/tasks`, addTask)
      
    },
    onSuccess: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error: AxiosError) => {},
  });
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //@ts-ignore
    mutation.mutate({ title, description, due_date });
  };

  const handleToogle = () => {
    setToogle(!toggle);
  };

  

  return (
    <div className="w-full h-full bg-zinc-950 py-4 text-white text-center">
      <h2 className=" text-blue-500  font-semibold text-2xl sm:text-3xl">
        My Task
      </h2>
      <div className="  my-2 flex flex-col max-w-3xl lg:max-w-6xl w-full items-center  mx-auto gap-6">
        <form
          onSubmit={onSubmit}
          className=" w-full h-fit px-5 py-3 bg-black rounded-lg"
        >
          <div className=" flex min-[668px]:hidden flex-row justify-center items-center w-full h-fit">
            {toggle ? (
              <button
                onClick={handleToogle}
                type="button"
                className=" w-10 h-10 bg-rose-500 hover:bg-rose-600 border border-rose-500 cursor-pointer rounded-full flex items-center justify-center  "
              >
                <GoX
                  title="Add"
                  className=" flex  w-[24px] h-[24px]  fill-white "
                />
              </button>
            ) : (
              <button
                onClick={handleToogle}
                type="button"
                className=" w-10 h-10 bg-blue-500 hover:bg-blue-600 border border-blue-500 cursor-pointer rounded-full flex items-center justify-center  "
              >
                <GoPlus
                  title="Add"
                  className=" flex  w-[24px] h-[24px]  fill-white "
                />
              </button>
            )}
          </div>
          <div className=" hidden min-[668px]:flex flex-row justify-between items-center">
            <div className=" flex flex-col items-start gap-1 ">
              <span>Title</span>
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="title"
                name="title"
                type="text"
                autoComplete="title"
                placeholder="Title Here..."
                className=" bg-black h-9 rounded-md outline-none outline-blue-500  "
              />
            </div>
            <div className=" flex flex-col items-start gap-1 ">
              <span>Description</span>
              <input
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="description"
                name="description"
                type="text"
                autoComplete="description"
                placeholder="Description Here..."
                className=" bg-black h-9 rounded-md outline-none outline-blue-500  "
              />
            </div>
            <div className=" flex flex-col items-start gap-1 ">
              <span>Time</span>
              <input
                required
                value={due_date}
                onChange={(e) => setDuedate(e.target.value)}
                id="due_date"
                name="due_date"
                type="text"
                autoComplete="due_date"
                placeholder="DD/MM/YYYY"
                className=" bg-black h-9 rounded-md outline-none outline-blue-500  "
              />
            </div>
            <div className=" pt-8">
              <button
                type="submit"
                className=" w-fit h-fit py-2 px-4 rounded-md text-white border-blue-500 bg-blue-500 hover:bg-blue-600  "
              >
                ADD
              </button>
            </div>
          </div>
          {toggle ? (
            <div className="sm:hidden flex flex-col justify-between items-center">
              <div className=" flex flex-col items-start gap-1 ">
                <span>Title</span>
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  id="title"
                  name="title"
                  type="text"
                  autoComplete="title"
                  placeholder="Title Here..."
                  className=" bg-black h-9 rounded-md outline-none outline-blue-500  "
                />
              </div>
              <div className=" flex flex-col items-start gap-1 ">
                <span>Description</span>
                <input
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  id="description"
                  name="description"
                  type="text"
                  autoComplete="description"
                  placeholder="Description Here..."
                  className=" bg-black h-9 rounded-md outline-none outline-blue-500  "
                />
              </div>
              <div className=" flex flex-col items-start gap-1 ">
                <span>Time</span>
                <input
                  required
                  value={due_date}
                  onChange={(e) => setDuedate(e.target.value)}
                  id="due_date"
                  name="due_date"
                  type="text"
                  autoComplete="due_date"
                  placeholder="DD/MM/YYYY"
                  className=" bg-black h-9 rounded-md outline-none outline-blue-500  "
                />
              </div>
              <div className=" pt-8">
                <button
                  type="submit"
                  className=" w-fit h-fit py-2 px-4 rounded-md text-white border-blue-500 bg-blue-500 hover:bg-blue-600  "
                >
                  ADD
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}
        </form>
        <div className=" w-full h-fit px-5 py-3 bg-black rounded-lg ">
          {mutation.isError || isError ? (
            <div className=" w-full h-screen flex items-center justify-center">
              <h3 className=" text-slate-400 sm:text-2xl text-xl ">Create you first task</h3>
            </div>
          ) : null}


          {mutation.isPending || isPending ? (
            <div className=" w-full h-screen flex items-center justify-center">
              <h3>loading....</h3>
            </div>
          ) : null}

          <div className="w-full my-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 max-sm:justify-items-center ">
            {tasks?.data.map((task: any, index: KeyType) => (
              <TaskCard
                key={index}
                title={task.title}
                description={task.description}
                due_date={task.due_date}
                id={task.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashborad;
