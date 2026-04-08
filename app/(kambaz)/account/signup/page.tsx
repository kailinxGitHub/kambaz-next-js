"use client";

import Link from "next/link";
import { useState } from "react";
import { FormControl } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { getHttpErrorMessage, signup } from "../client";
import { setCurrentUser } from "../reducer";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignup = async () => {
    if (password !== verifyPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    try {
      const user = await signup({ username, password, loginId: username });
      dispatch(setCurrentUser(user));
      setErrorMessage("");
      router.push("/account/profile");
    } catch (error) {
      setErrorMessage(getHttpErrorMessage(error));
    }
  };

  return (
    <div id="wd-signup-screen" className="p-4" style={{ maxWidth: "400px" }}>
      <h1 className="mb-4">Sign up</h1>
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
      <FormControl
        id="wd-password-verify"
        placeholder="verify password"
        type="password"
        className="mb-2"
        value={verifyPassword}
        onChange={(e) => setVerifyPassword(e.target.value)}
      />
      <button
        id="wd-signup-btn"
        className="btn btn-primary w-100 mb-2"
        onClick={handleSignup}
      >
        Sign up
      </button>
      <Link
        id="wd-signin-link"
        href="/account/signin"
        className="text-primary text-decoration-underline"
      >
        Sign in
      </Link>
    </div>
  );
}
