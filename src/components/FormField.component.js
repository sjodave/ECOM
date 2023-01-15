import React from "react";
import { Field } from "react-final-form";

export default function FormField({ field }) {
  return (
    <div className="relative w-full text-gray-400 focus-within:text-gray-600">
      <Field
        name={field.name}
        render={({ input, meta }) => (
          <div>
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-700"
            >
              {field.placeholder}
            </label>
            <input
              required
              type={field.type}
              {...input}
              placeholder={field.placeholder}
              id={field.name}
              className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm mt-1"
            />
            {meta.touched && meta.error && <span>{meta.error}</span>}
          </div>
        )}
      />
    </div>
  );
}
