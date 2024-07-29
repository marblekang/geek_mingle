"use client";

import { useState, useEffect } from "react";

type ErrorBoundaryProps = {
  children: React.ReactNode;
  fallback: React.ReactNode;
};

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  children,
  fallback,
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (error: ErrorEvent | PromiseRejectionEvent) => {
      // error 타입 지정 안해서 버그 발생.
      setHasError(true);
      console.error("Error caught by ErrorBoundary:", error);
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleError);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleError);
    };
  }, []);

  if (hasError) {
    return fallback;
  }

  return children;
};

export default ErrorBoundary;
