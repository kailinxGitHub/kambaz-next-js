import { createSlice } from "@reduxjs/toolkit";
import { courses } from "../database";
const initialState = {
  courses: courses,
};
const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, { payload: course }) => {
      const newCourse: any = {
        ...course,
        _id: new Date().getTime().toString(),
      };
      state.courses = [...state.courses, newCourse] as any;
    },
    deleteCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.filter(
        (c: any) => c._id !== courseId
      );
    },
    updateCourse: (state, { payload: course }) => {
      state.courses = state.courses.map((c: any) =>
        c._id === course._id ? course : c
      ) as any;
    },
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
  },
});
export const { addCourse, deleteCourse, updateCourse, setCourses } =
  coursesSlice.actions;
export default coursesSlice.reducer;
