import React, { useCallback, useState } from "react";
import Form from "../components/form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/url";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoEye } from "react-icons/io5";

const schema = z.object({
  email: z.string({ required_error: "Email is required" }).email(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(4, { message: "Password must contain at least 4 characters" }),
});

type formfield = z.infer<typeof schema>;

const Login = () => {
  const [viewPassword, setViewPassword] = useState(false);

  const navigate = useNavigate();

  const handlePasswordView = useCallback(() => {
    setViewPassword(!viewPassword);
  }, [viewPassword]);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<formfield>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      await axios.post(`${API_URL}/api/v1/login`, data, {
        withCredentials: true,
      });
      reset();
      navigate("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
        if (status === 401) {
          setError("root", {
            message: "Invalid credentials",
          });
        } else if (status === 400) {
          setError("root", {
            message: "Something went wrong",
          });
        } else if (status === 500) {
          setError("root", {
            message: "Internal server error",
          });
        }
      } else {
        setError("root", {
          message: "Network error or server is unreachable",
        });
      }
    }
  };

  const body = (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" flex flex-col justify-start gap-2 "
    >
      <div className=" w-full h-fit ">
        <span className=" text-xl">Email</span>
        <input
          {...register("email")}
          autoComplete="email"
          className=" mt-2 text-white w-full h-7 py-4 px-2 text-base bg-black border outline-none focus:border-blue-500 border-neutral-800 rounded-md "
        />
        {errors.email && (
          <div className=" text-sm text-red-500">{errors.email.message}</div>
        )}
      </div>
      <div className=" w-full h-fit ">
        <span className=" text-xl">Password</span>
        <div className=" relative">
          <input
            {...register("password")}
            type={viewPassword ? "text" : "password"}
            autoComplete="password"
            className=" mt-2 text-white w-full h-7 pl-2 pr-[19px] py-4 text-base bg-black border outline-none focus:border-blue-500 border-neutral-800 rounded-md "
          />
          <button
            type="button"
            onClick={handlePasswordView}
            className=" absolute top-[17px] right-1"
          >
            <IoEye />
          </button>
        </div>

        {errors.password && (
          <div className=" text-sm text-red-500">{errors.password.message}</div>
        )}
      </div>
      <div className=" w-full h-fit py-2 flex flex-row justify-end gap-3 ">
        <button
          disabled={isSubmitting}
          onClick={() => navigate("/")}
          className=" mt-2 w-fit h-fit px-3 py-2 rounded-md text-white bg-rose-500 hover:bg-rose-600"
          type="button"
        >
          Cancle
        </button>
        <button
          disabled={isSubmitting}
          className=" mt-2 w-fit h-fit px-3 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600"
          type="submit"
        >
          {isSubmitting ? "Loading..." : "Submit"}
        </button>
      </div>
    </form>
  );

  const footer = (
    <footer
      onClick={() => navigate("/register")}
      className=" text-neutral-400 text-sm text-center my-2"
    >
      <p>
        First time using Taskify?&nbsp;
        <span className=" text-blue-500 cursor-pointer hover:underline">
          Create an account
        </span>
      </p>
    </footer>
  );

  const errorBody = (
    <div className="text-sm text-red-500">
      {errors.root && <p>{errors.root.message}</p>}
    </div>
  );

  return (
    <>
      <div className=" w-full h-full bg-zinc-950  flex flex-row justify-center items-center ">
        <Form title="Login" body={body} error={errorBody} footer={footer} />
      </div>
    </>
  );
};

export default Login;
