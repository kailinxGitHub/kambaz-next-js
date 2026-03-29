import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../../database";
import * as api from "@/lib/kambaz/client-api";

const initialState = {
  assignments: assignments as any[],
  status: "idle",
  error: null as string | null,
};

export const fetchAssignments = createAsyncThunk(
  "assignments/fetchAssignments",
  async () => api.getAssignments()
);

export const createAssignmentAsync = createAsyncThunk(
  "assignments/createAssignmentAsync",
  async ({ assignment, role }: { assignment: any; role?: string | null }) =>
    api.createAssignment(assignment, role)
);

export const updateAssignmentAsync = createAsyncThunk(
  "assignments/updateAssignmentAsync",
  async ({ assignment, role }: { assignment: any; role?: string | null }) =>
    api.updateAssignment(assignment, role)
);

export const deleteAssignmentAsync = createAsyncThunk(
  "assignments/deleteAssignmentAsync",
  async (
    {
      assignmentId,
      role,
    }: { assignmentId: string; role?: string | null }
  ) => {
    await api.deleteAssignment(assignmentId, role);
    return assignmentId;
  }
);

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload: assignment }) => {
      state.assignments = [...state.assignments, assignment] as any;
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignmentId
      );
    },
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignment._id ? assignment : a
      ) as any;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignments.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAssignments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.assignments = action.payload;
      })
      .addCase(fetchAssignments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unable to load assignments.";
      })
      .addCase(createAssignmentAsync.fulfilled, (state, action) => {
        state.assignments = [...state.assignments, action.payload] as any;
      })
      .addCase(updateAssignmentAsync.fulfilled, (state, action) => {
        state.assignments = state.assignments.map((assignment: any) =>
          assignment._id === action.payload._id ? action.payload : assignment
        ) as any;
      })
      .addCase(deleteAssignmentAsync.fulfilled, (state, action) => {
        state.assignments = state.assignments.filter(
          (assignment: any) => assignment._id !== action.payload
        );
      })
      .addMatcher(
        (action) =>
          action.type === createAssignmentAsync.rejected.type ||
          action.type === updateAssignmentAsync.rejected.type ||
          action.type === deleteAssignmentAsync.rejected.type,
        (state, action: any) => {
          state.error =
            action.error?.message ?? "Unable to save assignment changes.";
        }
      );
  },
});

export const { addAssignment, deleteAssignment, updateAssignment } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;
