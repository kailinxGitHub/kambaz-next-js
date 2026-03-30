import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "@/lib/kambaz/client-api";

const initialState = {
  enrollments: [] as { _id: string; user: string; course: string }[],
  status: "idle",
  error: null as string | null,
};

export const fetchMyEnrollments = createAsyncThunk(
  "enrollments/fetchMyEnrollments",
  async () => api.getMyEnrollments()
);

export const enrollInCourseAsync = createAsyncThunk(
  "enrollments/enrollInCourseAsync",
  async (courseId: string) => api.enrollInCourse(courseId)
);

export const unenrollFromCourseAsync = createAsyncThunk(
  "enrollments/unenrollFromCourseAsync",
  async (courseId: string) => api.unenrollFromCourse(courseId)
);

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    clearEnrollments: (state) => {
      state.enrollments = [];
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyEnrollments.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMyEnrollments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.enrollments = action.payload;
      })
      .addCase(fetchMyEnrollments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unable to load enrollments.";
        state.enrollments = [];
      })
      .addCase(enrollInCourseAsync.fulfilled, (state, action) => {
        if (
          !state.enrollments.some(
            (enrollment) => enrollment._id === action.payload._id
          )
        ) {
          state.enrollments = [...state.enrollments, action.payload];
        }
      })
      .addCase(unenrollFromCourseAsync.fulfilled, (state, action) => {
        state.enrollments = state.enrollments.filter(
          (enrollment) => enrollment.course !== action.payload
        );
      })
      .addMatcher(
        (action) =>
          action.type === enrollInCourseAsync.rejected.type ||
          action.type === unenrollFromCourseAsync.rejected.type,
        (state, action) => {
          state.error =
            action.error?.message ?? "Unable to update enrollments.";
        }
      );
  },
});

export const { clearEnrollments } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
