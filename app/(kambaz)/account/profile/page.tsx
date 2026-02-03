import Link from "next/link";
import { FormControl, FormLabel, Button } from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="p-4" style={{ maxWidth: "400px" }}>
      <h1 className="mb-4">Profile</h1>

      <div className="mb-2">
        <FormLabel className="small text-secondary">Username</FormLabel>
        <FormControl
          id="wd-username"
          defaultValue="alice"
          readOnly
          plaintext
          className="mb-2"
        />
      </div>
      <div className="mb-2">
        <FormLabel className="small text-secondary">ID</FormLabel>
        <FormControl
          id="wd-user-id"
          defaultValue="123"
          readOnly
          plaintext
          className="mb-2"
        />
      </div>
      <div className="mb-2">
        <FormLabel className="small text-secondary">First Name</FormLabel>
        <FormControl id="wd-firstname" defaultValue="Alice" className="mb-2" />
      </div>
      <div className="mb-2">
        <FormLabel className="small text-secondary">Last Name</FormLabel>
        <FormControl
          id="wd-lastname"
          defaultValue="Wonderland"
          className="mb-2"
        />
      </div>
      <div className="mb-2">
        <FormLabel className="small text-secondary">Date of Birth</FormLabel>
        <div className="input-group">
          <FormControl id="wd-dob" type="date" defaultValue="1990-01-15" />
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
          defaultValue="alice@wonderland.com"
          className="mb-2"
        />
      </div>
      <div className="mb-3">
        <FormLabel className="small text-secondary">Role</FormLabel>
        <FormControl
          id="wd-role"
          defaultValue="User"
          readOnly
          plaintext
          className="mb-2"
        />
      </div>

      <Link
        href="/account/signin"
        className="btn btn-danger w-100"
        id="wd-signout-btn"
      >
        Sign out
      </Link>
    </div>
  );
}
