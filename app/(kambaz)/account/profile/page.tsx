"use client";
import { FormControl, FormLabel, FormSelect, Button } from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useEffect, useState } from "react";

export default function Profile() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  const router = useRouter();
  const [profile, setProfile] = useState<any>({});

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!currentUser) {
      router.push("/account/signin");
    } else {
      setProfile(currentUser);
    }
  }, [currentUser, router]);

  if (!mounted || !currentUser) return null;
  return (
    <div id="wd-profile-screen" className="p-4" style={{ maxWidth: "400px" }}>
      <h1 className="mb-4">Profile</h1>

      <div className="mb-2">
        <FormLabel className="small text-secondary">Username</FormLabel>
        <FormControl
          id="wd-username"
          value={profile.username || ""}
          onChange={(e) => setProfile({ ...profile, username: e.target.value })}
          className="mb-2"
        />
      </div>
      <div className="mb-2">
        <FormLabel className="small text-secondary">Password</FormLabel>
        <FormControl
          id="wd-password"
          type="password"
          value={profile.password || ""}
          onChange={(e) => setProfile({ ...profile, password: e.target.value })}
          className="mb-2"
        />
      </div>
      <div className="mb-2">
        <FormLabel className="small text-secondary">First Name</FormLabel>
        <FormControl
          id="wd-firstname"
          value={profile.firstName || ""}
          onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
          className="mb-2"
        />
      </div>
      <div className="mb-2">
        <FormLabel className="small text-secondary">Last Name</FormLabel>
        <FormControl
          id="wd-lastname"
          value={profile.lastName || ""}
          onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
          className="mb-2"
        />
      </div>
      <div className="mb-2">
        <FormLabel className="small text-secondary">Date of Birth</FormLabel>
        <div className="input-group">
          <FormControl
            id="wd-dob"
            type="date"
            value={profile.dob || ""}
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
          />
          <span className="input-group-text">
            <FaCalendarAlt className="text-secondary" />
          </span>
        </div>
      </div>
      <div className="mb-2">
        <FormLabel className="small text-secondary">Email</FormLabel>
        <FormControl
          id="wd-email"
          type="email"
          value={profile.email || ""}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          className="mb-2"
        />
      </div>
      <div className="mb-3">
        <FormLabel className="small text-secondary">Role</FormLabel>
        <FormSelect
          id="wd-role"
          value={profile.role || ""}
          onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          className="mb-2"
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
        </FormSelect>
      </div>

      <button
        onClick={() => {
          dispatch(setCurrentUser(null));
          router.push("/account/signin");
        }}
        className="btn btn-danger w-100"
        id="wd-signout-btn"
      >
        Sign out
      </button>
    </div>
  );
}
