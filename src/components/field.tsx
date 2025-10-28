import React from "react";

type FieldProps = {
  error?: { message?: string };
  children: React.ReactNode;
  style?: string;
};

const Field = ({ error, children, style }: FieldProps) => {
  return (
    <div className={`grid gap-2 ${style}`}>
      {children}
      {error && <p className="text-red-500 text-xs">{error.message}</p>}
    </div>
  );
};

export default Field;
