"use client";
import { Button, FormControl, FormLabel, FormSelect } from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { clearEnrollments } from "../../enrollments/reducer";
import { signout, updateUser, User } from "../client";
import { setCurrentUser } from "../reducer";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";

export default function Profile() {
  const { currentUser, isLoaded } = useAppSelector((state) => state.accountReducer);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [draftProfile, setDraftProfile] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isLoaded) {
      return;
    }
    if (!currentUser) {
      router.replace("/account/signin");
      return;
    }
  }, [currentUser, isLoaded, router]);

  const profile = draftProfile ?? currentUser;

  const handleUpdateProfile = async () => {
    if (!profile) {
      return;
    }
    try {
      const updatedUser = await updateUser(profile);
      dispatch(setCurrentUser(updatedUser));
      setDraftProfile(null);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to update profile."
      );
    }
  };

  const handleSignout = async () => {
    await signout();
    dispatch(setCurrentUser(null));
    dispatch(clearEnrollments());
    setDraftProfile(null);
    router.push("/account/signin");
  };

  if (!isLoaded || !currentUser || !profile) return null;
  return (
    <div id="wd-profile-screen" className="p-4" style={{ maxWidth: "400px" }}>
      <h1 className="mb-4">Profile</h1>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <div className="mb-2">
        <FormLabel className="small text-secondary">Username</FormLabel>
        <FormControl
          id="wd-username"
          value={profile.username || ""}
          onChange={(e) => setDraftProfile({ ...profile, username: e.target.value })}
          className="mb-2"
        />
      </div>
      <div className="mb-2">
        <FormLabel className="small text-secondary">Password</FormLabel>
        <FormControl
          id="wd-password"
          type="password"
          value={profile.password || ""}
          onChange={(e) => setDraftProfile({ ...profile, password: e.target.value })}
          className="mb-2"
        />
      </div>
      <div className="mb-2">
        <FormLabel className="small text-secondary">First Name</FormLabel>
        <FormControl
          id="wd-firstname"
          value={profile.firstName || ""}
          onChange={(e) => setDraftProfile({ ...profile, firstName: e.target.value })}
          className="mb-2"
        />
      </div>
      <div className="mb-2">
        <FormLabel className="small text-secondary">Last Name</FormLabel>
        <FormControl
          id="wd-lastname"
          value={profile.lastName || ""}
          onChange={(e) => setDraftProfile({ ...profile, lastName: e.target.value })}
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
            onChange={(e) => setDraftProfile({ ...profile, dob: e.target.value })}
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
          onChange={(e) => setDraftProfile({ ...profile, email: e.target.value })}
          className="mb-2"
        />
      </div>
      <div className="mb-3">
        <FormLabel className="small text-secondary">Role</FormLabel>
        <FormSelect
          id="wd-role"
          value={profile.role || ""}
          onChange={(e) => setDraftProfile({ ...profile, role: e.target.value })}
          className="mb-2"
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="TA">TA</option>
          <option value="INSTRUCTOR">Instructor</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
        </FormSelect>
      </div>

      <Button
        className="btn btn-primary w-100 mb-2"
        id="wd-update-btn"
        onClick={() => void handleUpdateProfile()}
      >
        Update
      </Button>
      <Button
        onClick={() => void handleSignout()}
        className="btn btn-danger w-100"
        id="wd-signout-btn"
      >
        Sign out
      </Button>
    </div>
  );
}
