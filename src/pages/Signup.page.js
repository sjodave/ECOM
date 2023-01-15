import React from "react";
import { Field, Form } from "react-final-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import FormField from "../components/FormField.component";
import { validateForm } from "../Helper/validateForm";
import { useAuthMutation } from "../utils/store";
// import { login } from '../utils/Auth/authChecker';

const formFieldValues = [
  {
    name: "firstname",
    type: "text",
    placeholder: "First Name",
  },
  {
    name: "lastname",
    type: "text",
    placeholder: "Last Name",
  },
  {
    name: "email",
    type: "email",
    placeholder: "Email Id",
  },
  {
    name: "phone",
    type: "number",
    placeholder: "Phone Number",
  },
  {
    name: "password",
    type: "password",
    placeholder: "Enter Password",
  },
  {
    name: "confirm-password",
    type: "text",
    placeholder: "Confirm Password",
  },
];

const renderFormFields = formFieldValues.map((field) => {
  return <FormField field={field} key={field.name} />;
});

const SignUp = (props) => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // //// const [setUser] = useAuthMutation();
  // const handleSignup = async (values) => {
  //   const resp = await setUser(values);
  //   if (resp.data) {
  //     console.log(resp.data);
  //     dispatch(createUser({ ...resp.data }));
  //     login({ ...resp.data });
  //     navigate("/");
  //   } else if (resp.error) {
  //     alert(resp.error.data.message);
  //   }
  // };

  const handleSignup = () => {};
  const validate = (formValues) => {
    return validateForm(formValues);
  };
  return (
    <div className="flex h-4/5 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className=" sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Register
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Form
            onSubmit={handleSignup}
            validate={validate}
            // initialValuesEqual={() => true}
            render={({ handleSubmit }) => (
              <form className="space-y-6" onSubmit={handleSubmit}>
                {renderFormFields}

                <div className="flex items-center justify-between ">
                  <div className="text-sm">
                    <Link
                      to="/signin"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Already a member? login
                    </Link>
                  </div>
                </div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Sign up
                </button>
              </form>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
