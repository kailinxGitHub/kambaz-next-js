import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as api from "@/lib/kambaz/client-api";
import type { Course } from "@/lib/kambaz/client-api";

type CoursesState = {
  courses: Course[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: CoursesState = {
  courses: [],
  status: "idle",
  error: null,
};

export const fetchCourses = createAsyncThunk("courses/fetchCourses", async () =>
  api.getCourses()
);

export const fetchMyCourses = createAsyncThunk(
  "courses/fetchMyCourses",
  async () => api.findMyCourses()
);

export const createCourseAsync = createAsyncThunk(
  "courses/createCourseAsync",
  async (course: Omit<Course, "_id">) => api.createCourse(course)
);

export const updateCourseAsync = createAsyncThunk(
  "courses/updateCourseAsync",
  async (course: Course) => api.updateCourse(course)
);

export const deleteCourseAsync = createAsyncThunk(
  "courses/deleteCourseAsync",
  async (courseId: string) => {
    await api.deleteCourse(courseId);
    return courseId;
  }
);

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, action: PayloadAction<Course>) => {
      state.courses = [...state.courses, action.payload];
    },
    deleteCourse: (state, action: PayloadAction<string>) => {
      state.courses = state.courses.filter((course) => course._id !== action.payload);
    },
    updateCourse: (state, action: PayloadAction<Course>) => {
      state.courses = state.courses.map((course) =>
        course._id === action.payload._id ? action.payload : course
      );
    },
    setCourses: (state, action: PayloadAction<Course[]>) => {
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
      .addCase(fetchMyCourses.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMyCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.courses = action.payload;
      })
      .addCase(fetchMyCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unable to load courses.";
      })
      .addCase(createCourseAsync.fulfilled, (state, action) => {
        state.courses = [...state.courses, action.payload];
        state.error = null;
      })
      .addCase(updateCourseAsync.fulfilled, (state, action) => {
        state.courses = state.courses.map((course) =>
          course._id === action.payload._id ? action.payload : course
        );
        state.error = null;
      })
      .addCase(deleteCourseAsync.fulfilled, (state, action) => {
        state.courses = state.courses.filter((course) => course._id !== action.payload);
        state.error = null;
      })
      .addCase(createCourseAsync.rejected, (state, action) => {
        state.error = action.error.message ?? "Unable to save course changes.";
      })
      .addCase(updateCourseAsync.rejected, (state, action) => {
        state.error = action.error.message ?? "Unable to save course changes.";
      })
      .addCase(deleteCourseAsync.rejected, (state, action) => {
        state.error = action.error.message ?? "Unable to save course changes.";
      });
  },
});
export const { addCourse, deleteCourse, updateCourse, setCourses } =
  coursesSlice.actions;
export default coursesSlice.reducer;
