import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/Auth/authChecker";
import { createUser } from "../utils/store";
import { useAuthMutation } from "../utils/store";
import { Form } from "react-final-form";
import FormField from "../components/FormField.component";
import Modal from "../components/Modal.component";

const SignIn = (props) => {
  let [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [setUser] = useAuthMutation();
  const handleLogin = async (values) => {
    const resp = await setUser(values);
    if (resp.data) {
      dispatch(createUser({ ...resp.data }));
      login({ ...resp.data });
      navigate("/");
    } else if (resp.error) {
      setIsOpen(true);
    }
  };

  const formFieldValues = [
    {
      name: "username",
      type: "text",
      placeholder: "Username",
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
    },
  ];

  const renderFormFields = formFieldValues.map((field) => {
    return <FormField field={field} key={field.name} />;
  });

  return (
    <div className="mt-5 flex h-4/5 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="align-center flex justify-between sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
          Sign in
        </h2>
        <img
          className="h-12 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Form
            onSubmit={handleLogin}
            // validate={validate}
            // initialValues={{ username: "kminchelle", password: "0lelplR" }}
            initialValuesEqual={() => true}
            render={({ handleSubmit }) => (
              <form className="space-y-6" onSubmit={handleSubmit}>
                {renderFormFields}
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
        <div className=" relative">
          <span
            className="absolute -inset-1 block w-64 -skew-y-3 line-through  "
            aria-hidden="true"
          ></span>
          <div className="relative my-3 text-center">New to Website?</div>
        </div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => navigate("/signup")}
        >
          Create an Account
        </button>
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
};

export default SignIn;
