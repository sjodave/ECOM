import React from "react";
import { Field } from "react-final-form";

export default function FormField({ field }) {
  return (
    <div className="relative w-full text-gray-400 focus-within:text-gray-600">
      <Field
        name={field.name}
        render={({ input, meta }) => (
          <div>
            <input
              required
              type={field.type}
              {...input}
              placeholder={field.placeholder}
              id={field.name}
              className="peer  relative mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-transparent shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
            <label
              htmlFor={field.name}
              className="absolute left-3 -top-3 block bg-white px-1 text-sm font-medium text-gray-700 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400"
            >
              {field.placeholder}
            </label>
            {meta.touched && meta.error && !meta.active && (
              <span className="text-xs  text-red-400  ">{meta.error}</span>
            )}
          </div>
        )}
      />
    </div>
  );
}
