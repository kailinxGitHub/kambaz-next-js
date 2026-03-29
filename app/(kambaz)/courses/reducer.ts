import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { courses } from "../database";
import * as api from "@/lib/kambaz/client-api";

const initialState = {
  courses: courses as any[],
  status: "idle",
  error: null as string | null,
};

export const fetchCourses = createAsyncThunk("courses/fetchCourses", async () =>
  api.getCourses()
);

export const createCourseAsync = createAsyncThunk(
  "courses/createCourseAsync",
  async ({ course, role }: { course: any; role?: string | null }) =>
    api.createCourse(course, role)
);

export const updateCourseAsync = createAsyncThunk(
  "courses/updateCourseAsync",
  async ({ course, role }: { course: any; role?: string | null }) =>
    api.updateCourse(course, role)
);

export const deleteCourseAsync = createAsyncThunk(
  "courses/deleteCourseAsync",
  async ({ courseId, role }: { courseId: string; role?: string | null }) => {
    await api.deleteCourse(courseId, role);
    return courseId;
  }
);

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, { payload: course }) => {
      state.courses = [...state.courses, course] as any;
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unable to load courses.";
      })
      .addCase(createCourseAsync.fulfilled, (state, action) => {
        state.courses = [...state.courses, action.payload] as any;
      })
      .addCase(updateCourseAsync.fulfilled, (state, action) => {
        state.courses = state.courses.map((course: any) =>
          course._id === action.payload._id ? action.payload : course
        ) as any;
      })
      .addCase(deleteCourseAsync.fulfilled, (state, action) => {
        state.courses = state.courses.filter(
          (course: any) => course._id !== action.payload
        );
      })
      .addMatcher(
        (action) =>
          action.type === createCourseAsync.rejected.type ||
          action.type === updateCourseAsync.rejected.type ||
          action.type === deleteCourseAsync.rejected.type,
        (state, action: any) => {
          state.error = action.error?.message ?? "Unable to save course changes.";
        }
      );
  },
});
export const { addCourse, deleteCourse, updateCourse, setCourses } =
  coursesSlice.actions;
export default coursesSlice.reducer;
