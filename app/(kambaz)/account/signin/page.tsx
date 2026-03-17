"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FormControl } from "react-bootstrap";
import * as db from "../../database";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { useRouter } from "next/navigation";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignin = () => {
    const user = db.users.find(
      (u: any) => u.username === username && u.password === password
    );
    if (user) {
      dispatch(setCurrentUser(user));
      router.push("/dashboard");
    }
  };

  if (!mounted) return null;

  return (
    <div id="wd-signin-screen" className="p-4" style={{ maxWidth: "400px" }}>
      <h1 className="mb-4">Sign in</h1>
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
