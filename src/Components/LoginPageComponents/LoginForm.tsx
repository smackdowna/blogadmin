"use client"
import { SubmitHandler, useForm } from "react-hook-form";


type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  const handleLogin: SubmitHandler<LoginFormInputs> = (data) => {
    const loginData = {
      email: data.email,
      password: data.password,
    };
    console.log(loginData);
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-7 rounded-lg border bg-white p-7 sm:p-10">
      <h1 className="text-3xl font-semibold tracking-tight">Sign In</h1>

      <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
        <div className="space-y-2 text-sm">
          <label htmlFor="email" className="block text-zinc-700 dark:text-zinc-300 font-medium">
            Email
          </label>
          <input
            className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:border-primary-10 transition duration-300 focus:shadow"
            id="email"
            placeholder="Enter email"
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        </div>

        <div className="space-y-2 text-sm">
          <label htmlFor="password" className="block text-zinc-700 dark:text-zinc-300 font-medium">
            Password
          </label>
          <input
            className="flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:border-primary-10 transition duration-300 focus:shadow"
            id="password"
            placeholder="Enter password"
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-md bg-primary-10 px-5 py-2 text-white transition-colors hover:bg-primary-10/95"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
