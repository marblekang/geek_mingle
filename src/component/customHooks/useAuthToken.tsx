import React from "react";

export const useAuthToken = () => {
  const key = "TOKEN";
  const token = localStorage.getItem(key);
  const setToken = ({ token }: { token: string }) => {
    localStorage.setItem(key, token);
  };
  const removeToken = () => {
    localStorage.removeItem(key);
  };
  return { token, setToken, removeToken };
};
