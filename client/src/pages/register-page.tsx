import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/form";
import axios from "axios";
import { API_URL } from "../utils/url";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoEye } from "react-icons/io5";

const schema = z.object({
  email: z.string({ required_error: "Email is required" }).email(),
  username: z
    .string({ required_error: "username is required" })
    .min(3, { message: "username must contain at least 3 characters" })
    .max(20, { message: "username must not exceed 20 characters" })
    .refine(
      (value) => {
        // Check for alphanumeric characters, @, +, and -
        const validRegex = /^[a-zA-Z0-9@+\-]+$/;
        return validRegex.test(value);
      },
      {
        message:
          "Username must only contain alphanumeric characters, @, +, and -",
      }
    ),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(4, { message: "Password must contain at least 4 characters" })
    .refine(
      (value) => {
        const symbolRegex = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/@]/;
        const numberRegex = /\d/;
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;

        return (
          symbolRegex.test(value) &&
          numberRegex.test(value) &&
          uppercaseRegex.test(value) &&
          lowercaseRegex.test(value)
        );
      },
      {
        message:
          "Password must contain symbols, numbers, uppercase, and lowercase characters",
      }
    ),
});

type formfield = z.infer<typeof schema>;

const Register = () => {
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
      await axios.post(`${API_URL}/api/v1/register`, data, {
        withCredentials: true,
      });
      reset();
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
        if (status === 400) {
          setError("root", {
            message: "Email already exist",
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
          type="email"
          autoComplete="email"
          className=" mt-2 text-white w-full h-7 p-4 text-base bg-black border outline-none focus:border-blue-500 border-neutral-800 rounded-md "
        />
        {errors.email && (
          <div className=" text-sm text-red-500">{errors.email.message}</div>
        )}
      </div>
      <div className=" w-full h-fit ">
        <span className=" text-xl">Username</span>
        <input
          {...register("username")}
          type="text"
          autoComplete="username"
          className=" mt-2 text-white w-full h-7 p-4 text-base bg-black border outline-none focus:border-blue-500 border-neutral-800 rounded-md "
        />
        {errors.username && (
          <div className=" text-sm text-red-500">{errors.username.message}</div>
        )}
      </div>
      <div className=" w-full h-fit ">
        <span className=" text-xl">Password</span>
        <div className=" relative">
          <input
            {...register("password")}
            type={viewPassword ? "text" : "password"}
            autoComplete="password"
            className=" mt-2 text-white w-full h-7 p-4 text-base bg-black border outline-none focus:border-blue-500 border-neutral-800 rounded-md "
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
      onClick={() => navigate("/login")}
      className=" text-neutral-400 text-sm text-center my-2"
    >
      <p>
        Already have an account?&nbsp;
        <span className=" text-blue-500 cursor-pointer hover:underline">
          Sign in
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
        <Form title="Register" body={body} error={errorBody} footer={footer} />
      </div>
    </>
  );
};

export default Register;
