import axios from "axios";

export type User = {
  _id: string;
  username: string;
  password?: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  loginId: string;
  section: string;
  role: string;
  lastActivity: string;
  totalActivity: string;
};

export const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

export const axiosWithCredentials = axios.create({
  baseURL: HTTP_SERVER,
  withCredentials: true,
});

export const signin = async (credentials: {
  username: string;
  password: string;
}) => {
  const response = await axiosWithCredentials.post<User>(
    "/api/users/signin",
    credentials
  );
  return response.data;
};

export const signup = async (user: Partial<User>) => {
  const response = await axiosWithCredentials.post<User>("/api/users/signup", user);
  return response.data;
};

export const profile = async () => {
  const response = await axiosWithCredentials.post<User>("/api/users/profile");
  return response.data;
};

export const updateUser = async (user: User) => {
  const response = await axiosWithCredentials.put<User>(
    `/api/users/${user._id}`,
    user
  );
  return response.data;
};

export const signout = async () => {
  await axiosWithCredentials.post("/api/users/signout");
};
