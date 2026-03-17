"use client";
import Link from "next/link";
import { FormControl } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function Signup() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div id="wd-signup-screen" className="p-4" style={{ maxWidth: "400px" }}>
      <h1 className="mb-4">Sign up</h1>
      <FormControl id="wd-username" placeholder="username" className="mb-2" />
      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2"
      />
      <FormControl
        id="wd-password-verify"
        placeholder="verify password"
        type="password"
        className="mb-2"
      />
      <Link
        id="wd-signup-btn"
        href="/account/profile"
        className="btn btn-primary w-100 mb-2"
      >
        Sign up
      </Link>
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
