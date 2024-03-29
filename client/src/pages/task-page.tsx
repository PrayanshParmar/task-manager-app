import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import Model from "../components/model";
import { queryClient } from "../App";
import { formatDate } from "../utils/format-date";
import { API_URL } from "../utils/url";

const TaskPage = () => {
  let { taskid } = useParams();
  const [model, setModel] = useState(false);
  const redirect = useNavigate();
  const {
    data: taskDetails,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["taskDetails", taskid],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/v1/tasks/${taskid}`, {
        withCredentials: true,
      });
      return res;
    },
    staleTime: 20000,
  });

  const [operationType, setOperationType] = useState<string | null>(null);

  const handleModel = (type: string | null) => {
    setModel(!model);
    setOperationType(type);
  };

  const update = useMutation({
    mutationFn: (updateTask) => {
      return axios.put(`${API_URL}/api/v1/tasks/${taskid}`, updateTask, {
        withCredentials: true,
      });
    },
    onSuccess: async () => {
      handleModel(null);
      return await queryClient.invalidateQueries({ queryKey: ["taskDetails"] });
    },
    onError: (error: AxiosError) => {},
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //@ts-ignore
    update.mutate({ title, description, due_date });
  };

  const [title, setTitle] = useState(taskDetails?.data[0].title || "");
  const [description, setDescription] = useState(
    taskDetails?.data[0].description || ""
  );
  const [due_date, setDuedate] = useState(taskDetails?.data[0].due_date || "");

  const deleteMutation = useMutation({
    mutationFn: () => {
      return axios.delete(`${API_URL}/api/v1/tasks/${taskid}`, {
        withCredentials: true,
      });
    },
    onSuccess: async () => {
      handleModel(null);
      return redirect("/dashboard");
    },
    onError: (error: AxiosError) => {},
  });
  const onDelete = async (e: React.MouseEvent) => {
    deleteMutation.mutate();
  };
  const updateModel = (
    <>
      <h2 className=" flex flex-row justify-start items-center text-[28px]  ">
        <span className=" text-red-500" >Edit</span>
      </h2>
    <form onSubmit={onSubmit} className=" flex flex-col justify-start gap-2 ">
      <div className=" w-full h-fit ">
        <span className=" text-xl">Title</span>
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="title"
          name="title"
          type="text"
          autoComplete="title"
          placeholder="Title Here..."
          className=" mt-2 text-white w-full h-7 p-4 text-base bg-black border outline-none focus:border-blue-500 border-neutral-800 rounded-md "
        />
      </div>
      <div className=" w-full h-fit ">
        <span className=" text-xl">Description</span>
        <input
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id="description"
          name="description"
          type="text"
          autoComplete="description"
          placeholder="Description Here..."
          className=" mt-2 text-white w-full h-7 p-4 text-base bg-black border outline-none focus:border-blue-500 border-neutral-800 rounded-md "
        />
      </div>
      <div className=" w-full h-fit ">
        <span className=" text-xl">Due Date</span>
        <input
          required
          value={due_date}
          onChange={(e) => setDuedate(e.target.value)}
          id="due_date"
          name="due_date"
          type="text"
          autoComplete="due_date"
          placeholder="DD/MM/YYYY"
          className=" mt-2 text-white w-full h-7 p-4 text-base bg-black border outline-none focus:border-blue-500 border-neutral-800 rounded-md "
        />
      </div>
      <div className=" w-full h-fit py-2 flex flex-row justify-end gap-3 ">
        <button
          onClick={() => handleModel(null)}
          className=" mt-2 w-fit h-fit px-3 py-2 rounded-md text-white bg-rose-500 hover:bg-rose-600"
          type="button"
        >
          Cancle
        </button>
        <button
          className=" mt-2 w-fit h-fit px-3 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
    </>
  );

  const deleteModel = (
    <>
      <h2 className=" flex flex-row justify-start items-center text-[28px]  ">
        <span className=" text-red-500" >Delete</span>
      </h2>
      <div className=" flex flex-col justify-start gap-2">
        <p className="text-neutral-400 text-base text-center my-2">
          Are you sure you want to{" "}
          <span className=" text-rose-500">delete</span> task?{" "}
        </p>
        <div className=" w-full h-fit py-2 flex flex-row justify-end gap-3 ">
          <button
            onClick={() => handleModel(null)}
            className=" mt-2 w-fit h-fit px-3 py-2 rounded-md text-white bg-emerald-500 hover:bg-emerald-600"
            type="button"
          >
            Cancle
          </button>
          <button
            onClick={onDelete}
            className=" mt-2 w-fit h-fit px-3 py-2 rounded-md text-white bg-rose-500 hover:bg-rose-600"
            type="button"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );

  if (isError) {
    console.log("error");
    redirect("/dashboard");
  }
  return (
    <>
      {}
      {model ? (
        <Model body={operationType === "delete" ? deleteModel : updateModel} />
      ) : null}
      <div className="w-full h-full z-10 ">
        <div className=" my-12 max-w-3xl  w-full items-center  m-auto gap-6 text-white">
          <div className=" w-full h-fit px-5 py-3 bg-black rounded-lg  flex flex-col items-center text-center gap-3">
            <h2 className=" w-full text-blue-500 h-fit pb-2 font-semibold text-xl sm:text-2xl border-b border-slate-600 capitalize ">
              {taskDetails?.data[0].title}
            </h2>
            <p className=" w-full h-fit break-words text-[14px] text-slate-300  sm:text-[18px] ">
              {taskDetails?.data[0].description}
            </p>
            <div className="w-full h-fit break-words text-base text-slate-300 sm:text-xl flex flex-row items-center justify-between">
              <div className=" flex flex-row max-sm:flex-col  justify-center gap-2 ">
                <span>Due date: </span>
                <span className=" text-rose-500 ">
                  {taskDetails?.data[0].due_date}
                </span>
              </div>
              <div className=" text-blue-500 flex gap-2">
                <BiEdit
                  onClick={() => handleModel("edit")}
                  title="Edit"
                  className="  cursor-pointer  hover:text-blue-600 w-6 h-6  "
                />
                <MdOutlineDelete
                  onClick={() => handleModel("delete")}
                  title="Delete"
                  className=" cursor-pointer  hover:text-blue-600 w-6 h-6  "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskPage;
