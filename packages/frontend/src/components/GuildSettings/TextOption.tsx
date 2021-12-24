import React from "react";
import { useField } from "formik";

interface TextOptionProps {
  label: string;
  name: string;
  placeholder?: string;
}

const TextOption: React.FC<TextOptionProps> = ({ label, name, placeholder }) => {
  const [field, meta] = useField<string>(name);

  return (
    <>
      <div className="my-2 rounded flex justify-between bg-slate-800 p-4">
        <p>{label}</p>
        <input
          className="p-1 text-xl rounded bg-zinc-800"
          placeholder={placeholder}
          autoComplete="off"
          {...field}
        />
      </div>
      {meta.error && meta.touched && <div>{meta.error}</div>}
    </>
  );
};

export default TextOption;
