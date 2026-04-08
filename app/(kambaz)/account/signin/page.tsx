"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FormControl } from "react-bootstrap";
import { getHttpErrorMessage, signin } from "../client";
import { setCurrentUser } from "../reducer";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../hooks";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { currentUser, isLoaded } = useAppSelector((state) => state.accountReducer);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && currentUser) {
      router.replace("/dashboard");
    }
  }, [currentUser, isLoaded, router]);

  const handleSignin = async () => {
    try {
      const user = await signin({ username, password });
      dispatch(setCurrentUser(user));
      setErrorMessage("");
      router.push("/dashboard");
    } catch (error) {
      setErrorMessage(getHttpErrorMessage(error));
    }
  };

  return (
    <div id="wd-signin-screen" className="p-4" style={{ maxWidth: "400px" }}>
      <h1 className="mb-4">Sign in</h1>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <FormControl
        id="wd-username"
        placeholder="username"
        className="mb-2"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        id="wd-signin-btn"
        className="btn btn-primary w-100 mb-2"
        onClick={handleSignin}
      >
        Sign in
      </button>
      <Link
        id="wd-signup-link"
        href="/account/signup"
        className="text-primary text-decoration-underline"
      >
        Sign up
      </Link>
    </div>
  );
}
