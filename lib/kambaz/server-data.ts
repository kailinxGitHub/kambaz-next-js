import assignmentSeed from "@/app/(kambaz)/database/assignments.json";
import courseSeed from "@/app/(kambaz)/database/courses.json";
import { v4 as uuidv4 } from "uuid";

type Course = Record<string, unknown> & { _id: string };
type Assignment = Record<string, unknown> & { _id: string; course: string };

type KambazDataStore = {
  courses: Course[];
  assignments: Assignment[];
};

declare global {
  var __kambazDataStore: KambazDataStore | undefined;
}

const dataStore =
  globalThis.__kambazDataStore ??
  (globalThis.__kambazDataStore = {
    courses: structuredClone(courseSeed) as Course[],
    assignments: structuredClone(assignmentSeed) as Assignment[],
  });

export const getCourses = () => dataStore.courses;

export const createCourse = (course: Record<string, unknown>) => {
  const newCourse = {
    image: "/images/reactjs.jpg",
    ...course,
    _id: uuidv4(),
  } as Course;
  dataStore.courses = [...dataStore.courses, newCourse];
  return newCourse;
};

export const updateCourse = (
  courseId: string,
  courseUpdates: Record<string, unknown>
) => {
  let updatedCourse: Course | null = null;
  dataStore.courses = dataStore.courses.map((course) => {
    if (course._id !== courseId) {
      return course;
    }
    updatedCourse = { ...course, ...courseUpdates, _id: courseId } as Course;
    return updatedCourse;
  });
  return updatedCourse;
};

export const deleteCourse = (courseId: string) => {
  const courseExists = dataStore.courses.some((course) => course._id === courseId);
  if (!courseExists) {
    return false;
  }
  dataStore.courses = dataStore.courses.filter((course) => course._id !== courseId);
  dataStore.assignments = dataStore.assignments.filter(
    (assignment) => assignment.course !== courseId
  );
  return true;
};

export const getAssignments = () => dataStore.assignments;

export const createAssignment = (assignment: Record<string, unknown>) => {
  const newAssignment = {
    ...assignment,
    _id: uuidv4(),
  } as Assignment;
  dataStore.assignments = [...dataStore.assignments, newAssignment];
  return newAssignment;
};

export const updateAssignment = (
  assignmentId: string,
  assignmentUpdates: Record<string, unknown>
) => {
  let updatedAssignment: Assignment | null = null;
  dataStore.assignments = dataStore.assignments.map((assignment) => {
    if (assignment._id !== assignmentId) {
      return assignment;
    }
    updatedAssignment = {
      ...assignment,
      ...assignmentUpdates,
      _id: assignmentId,
    } as Assignment;
    return updatedAssignment;
  });
  return updatedAssignment;
};

export const deleteAssignment = (assignmentId: string) => {
  const assignmentExists = dataStore.assignments.some(
    (assignment) => assignment._id === assignmentId
  );
  if (!assignmentExists) {
    return false;
  }
  dataStore.assignments = dataStore.assignments.filter(
    (assignment) => assignment._id !== assignmentId
  );
  return true;
};
