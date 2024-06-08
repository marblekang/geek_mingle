"use client";
import { useReducer, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import styles from "./sign-in.module.css";

interface State {
  email: string;
  password: string;
  error: string | null;
}

type Action =
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "SET_ERROR"; payload: string | null };

const initialState: State = {
  email: "",
  password: "",
  error: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const Login = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch({ type: "SET_ERROR", payload: null });

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: state.email, password: state.password }),
      });

      if (res.status === 200) {
        const data = await res.json();
        localStorage.setItem("TOKEN", data.token);
        /* login후 mypage로 이동 */
        router.push("/dashboard"); // 로그인 후 대시보드 페이지로 이동
      } else {
        const data = await res.json();
        dispatch({ type: "SET_ERROR", payload: data.message });
      }
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "An unexpected error occurred" });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    switch (id) {
      case "email":
        dispatch({ type: "SET_EMAIL", payload: value });
        break;
      case "password":
        dispatch({ type: "SET_PASSWORD", payload: value });
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            value={state.email}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={state.password}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        {state.error && <p className={styles.error}>{state.error}</p>}
        <button type="submit" className={styles.submitButton}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
