"use client";
import { useReducer, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import styles from "./sign-up.module.css";

interface State {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  error: string | null;
}

type Action =
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "SET_CONFIRM_PASSWORD"; payload: string }
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_ERROR"; payload: string | null };

const initialState: State = {
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
  error: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_CONFIRM_PASSWORD":
      return { ...state, confirmPassword: action.payload };
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const Register = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch({ type: "SET_ERROR", payload: null });

    if (state.password !== state.confirmPassword) {
      dispatch({ type: "SET_ERROR", payload: "Passwords do not match" });
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: state.email,
          password: state.password,
          name: state.name,
        }),
      });

      if (res.status === 201) {
        router.push("/form"); // 회원가입 후 로그인 페이지로 이동
      } else {
        const data = await res.json();
        dispatch({ type: "SET_ERROR", payload: data.message });
      }
    } catch (error) {
      console.log(error, "error");
      dispatch({ type: "SET_ERROR", payload: "An unexpected error occurred" });
    }
  };
  console.log(state);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    switch (id) {
      case "email":
        dispatch({ type: "SET_EMAIL", payload: value });
        break;
      case "password":
        dispatch({ type: "SET_PASSWORD", payload: value });
        break;
      case "confirmPassword":
        dispatch({ type: "SET_CONFIRM_PASSWORD", payload: value });
        break;
      case "name":
        dispatch({ type: "SET_NAME", payload: value });
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.container}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={state.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={state.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={state.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={state.name}
            onChange={handleChange}
            required
          />
        </div>
        {state.error && <p className={styles.error}>{state.error}</p>}
        <button type="submit" className={styles.submitButton}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
