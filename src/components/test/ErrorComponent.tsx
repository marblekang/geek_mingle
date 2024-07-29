"use client";

const ErrorComponent = () => {
  throw new Error("Test Error");
  return <div>This will never be displayed</div>;
};

export default ErrorComponent;
