import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/Auth/authChecker";
// import { createUser } from "../utils/store/actions/Auth.actions";
import { createUser } from "../utils/store";
import { useAuthMutation } from "../utils/store";
import { Form, Field } from "react-final-form";

const SignIn = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [setUser] = useAuthMutation();
  const handleLogin = async (values) => {
    const resp = await setUser(values);
    if (resp.data) {
      console.log(resp.data);
      dispatch(createUser({ ...resp.data }));
      login({ ...resp.data });
      navigate("/");
    } else if (resp.error) {
      alert(resp.error.data.message);
    }
  };
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className="flex h-4/5 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <Form
              onSubmit={handleLogin}
              // validate={validate}
              render={({ handleSubmit }) => (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <Field
                      name="username"
                      render={({ input, meta }) => (
                        <div>
                          <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Username
                          </label>
                          <input
                            type="text"
                            {...input}
                            placeholder="Username"
                            id="username"
                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mt-1"
                          />
                          {meta.touched && meta.error && (
                            <span>{meta.error}</span>
                          )}
                        </div>
                      )}
                    />
                  </div>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <Field
                      name="password"
                      render={({ input, meta }) => (
                        <div>
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Password
                          </label>
                          <input
                            type="text"
                            {...input}
                            placeholder="password"
                            id="password"
                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mt-1"
                          />
                          {meta.touched && meta.error && (
                            <span>{meta.error}</span>
                          )}
                        </div>
                      )}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <a
                        href="#1"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot your password?
                      </a>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
