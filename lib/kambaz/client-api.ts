import { axiosWithCredentials } from "@/app/(kambaz)/account/client";

export type Course = {
  _id: string;
  image?: string;
  name?: string;
  number?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
};

export type Assignment = {
  _id: string;
  course: string;
  title: string;
  description: string;
  points: number;
  dueDate: string;
  availableDate: string;
  availableUntil?: string;
};

export type AssignmentDraft = Omit<Assignment, "_id">;

export type ModuleLesson = {
  _id: string;
  name: string;
};

export type Module = {
  _id: string;
  course: string;
  title?: string;
  name?: string;
  lessons?: ModuleLesson[];
  editing?: boolean;
};

export type Enrollment = {
  _id: string;
  user: string;
  course: string;
};

export type CourseUser = {
  _id: string;
  firstName: string;
  lastName: string;
  loginId: string;
  section: string;
  role: string;
  lastActivity: string;
  totalActivity: string;
};

export const getCourses = async () => {
  const response = await axiosWithCredentials.get<Course[]>("/api/courses");
  return response.data;
};

export const findMyCourses = async () => {
  const response = await axiosWithCredentials.get<Course[]>("/api/users/current/courses");
  return response.data;
};

export const createCourse = async (course: Omit<Course, "_id">) => {
  const response = await axiosWithCredentials.post<Course>(
    "/api/users/current/courses",
    course
  );
  return response.data;
};

export const updateCourse = async (course: Course) => {
  const response = await axiosWithCredentials.put<Course>(
    `/api/courses/${course._id}`,
    course
  );
  return response.data;
};

export const deleteCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.delete<{ courseId: string }>(
    `/api/courses/${courseId}`
  );
  return response.data;
};

export const getAssignments = async () => {
  const response = await axiosWithCredentials.get<Assignment[]>("/api/assignments");
  return response.data;
};

export const createAssignment = async (assignment: Omit<Assignment, "_id">) => {
  const response = await axiosWithCredentials.post<Assignment>(
    "/api/assignments",
    assignment
  );
  return response.data;
};

export const updateAssignment = async (assignment: Assignment) => {
  const response = await axiosWithCredentials.put<Assignment>(
    `/api/assignments/${assignment._id}`,
    assignment
  );
  return response.data;
};

export const deleteAssignment = async (assignmentId: string) => {
  const response = await axiosWithCredentials.delete<{ assignmentId: string }>(
    `/api/assignments/${assignmentId}`
  );
  return response.data;
};

export const findModulesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get<Module[]>(
    `/api/courses/${courseId}/modules`
  );
  return response.data;
};

export const createModuleForCourse = async (
  courseId: string,
  module: Omit<Module, "_id" | "course">
) => {
  const response = await axiosWithCredentials.post<Module>(
    `/api/courses/${courseId}/modules`,
    module
  );
  return response.data;
};

export const updateModule = async (courseId: string, module: Module) => {
  const response = await axiosWithCredentials.put<Module>(
    `/api/courses/${courseId}/modules/${module._id}`,
    module
  );
  return response.data;
};

export const deleteModule = async (courseId: string, moduleId: string) => {
  const response = await axiosWithCredentials.delete(
    `/api/courses/${courseId}/modules/${moduleId}`
  );
  return response.data;
};

export const enrollIntoCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.post(
    `/api/users/${userId}/courses/${courseId}`
  );
  return response.data;
};

export const unenrollFromCourseByUser = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.delete(
    `/api/users/${userId}/courses/${courseId}`
  );
  return response.data;
};

export const getMyEnrollments = async () => {
  const response = await axiosWithCredentials.get<Enrollment[]>(
    "/api/users/current/enrollments"
  );
  return response.data;
};

export const enrollInCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.post<Enrollment>(
    `/api/courses/${courseId}/enrollments`
  );
  return response.data;
};

export const unenrollFromCourse = async (courseId: string) => {
  await axiosWithCredentials.delete(`/api/courses/${courseId}/enrollments/current`);
  return courseId;
};

export const getUsersForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get<CourseUser[]>(
    `/api/courses/${courseId}/users`
  );
  return response.data;
};
