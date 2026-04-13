import axios from "axios";

export { getHttpErrorMessage } from "@/lib/http-error";

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

export const findAllUsers = async () => {
  const response = await axiosWithCredentials.get<User[]>("/api/users");
  return response.data;
};

export const findUsersByRole = async (role: string) => {
  const response = await axiosWithCredentials.get<User[]>(`/api/users?role=${role}`);
  return response.data;
};

export const findUsersByPartialName = async (name: string) => {
  const response = await axiosWithCredentials.get<User[]>(`/api/users?name=${name}`);
  return response.data;
};

export const findUserById = async (id: string) => {
  const response = await axiosWithCredentials.get<User>(`/api/users/${id}`);
  return response.data;
};

export const deleteUser = async (userId: string) => {
  const response = await axiosWithCredentials.delete(`/api/users/${userId}`);
  return response.data;
};

export const createUser = async (user: Partial<User>) => {
  const response = await axiosWithCredentials.post<User>("/api/users", user);
  return response.data;
};
