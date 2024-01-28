import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../components/form";
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const redirect = useNavigate();
    const title  = "Register";

    const mutation = useMutation({
        mutationFn: (createUser) => {
          return axios.post(`${String(process.env.API_URL)}/api/v1/register`, createUser);
        },
        onSuccess: () => {
          redirect("/login");
        },
        onError: (error: AxiosError) => {
        },
      });
      const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //@ts-ignore
        mutation.mutate({ email, password, username });
      };

    const body =  (
        <form onSubmit={onSubmit} className=" flex flex-col justify-start gap-2 ">
          <div className=" w-full h-fit ">
            <span className=" text-xl" >Email</span>
            <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
              className=" mt-2 text-white w-full h-7 p-4 text-base bg-black border outline-none focus:border-blue-500 border-neutral-800 rounded-md "
            />
          </div>
          <div className=" w-full h-fit ">
            <span className=" text-xl" >Username</span>
            <input
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            name="username"
            type="text"
            autoComplete="username"
              className=" mt-2 text-white w-full h-7 p-4 text-base bg-black border outline-none focus:border-blue-500 border-neutral-800 rounded-md "
            />
          </div>
          <div className=" w-full h-fit ">
            <span className=" text-xl" >Password</span>
            <input
             required
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             id="password"
             name="password"
             type="password"
             autoComplete="password"
              className=" mt-2 text-white w-full h-7 p-4 text-base bg-black border outline-none focus:border-blue-500 border-neutral-800 rounded-md "
            />
          </div>
          <div className=" w-full h-fit py-2 flex flex-row justify-end gap-3 " >
          <button onClick={() => redirect('/')} className=" mt-2 w-fit h-fit px-3 py-2 rounded-md text-white bg-rose-500 hover:bg-rose-600" type="button" >
                Cancle
          </button>
          <button className=" mt-2 w-fit h-fit px-3 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600" type="submit" >
                Submit
          </button>
          </div>
        </form>
    )

    const footer =  (
        <footer
         onClick={()=> redirect('/login')}
         className=" text-neutral-400 text-sm text-center my-2">
      <p>
      Already have an account?&nbsp;
        <span
          className=" text-blue-500 cursor-pointer hover:underline"
        >
          Sign in
        </span>
      </p>
    </footer>
    )
    const errorBody = (
        <div className="text-sm text-red-500">
          {mutation.isError && mutation.error.response?.status === 400 && <p>Email already exist</p>}
          {mutation.isError && mutation.error.response?.status === 500 && <p>Internal server error</p>}
        </div>
      );
    return (
        <>
        <div className=" w-full h-full bg-zinc-950  flex flex-row justify-center items-center " >
        <Form
        title={title}
        body={body}
        error={errorBody}
        footer={footer}
        />
        </div>
        </>
    );
}
 
export default Register;