import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as api from "@/lib/kambaz/client-api";
import type { Assignment, AssignmentDraft } from "@/lib/kambaz/client-api";

type AssignmentsState = {
  assignments: Assignment[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: AssignmentsState = {
  assignments: [],
  status: "idle",
  error: null,
};

export const fetchAssignments = createAsyncThunk(
  "assignments/fetchAssignments",
  async () => api.getAssignments()
);

export const createAssignmentAsync = createAsyncThunk(
  "assignments/createAssignmentAsync",
  async (assignment: AssignmentDraft) => api.createAssignment(assignment)
);

export const updateAssignmentAsync = createAsyncThunk(
  "assignments/updateAssignmentAsync",
  async (assignment: Assignment) => api.updateAssignment(assignment)
);

export const deleteAssignmentAsync = createAsyncThunk(
  "assignments/deleteAssignmentAsync",
  async (assignmentId: string) => {
    await api.deleteAssignment(assignmentId);
    return assignmentId;
  }
);

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, action: PayloadAction<Assignment>) => {
      state.assignments = [...state.assignments, action.payload];
    },
    deleteAssignment: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.filter(
        (assignment) => assignment._id !== action.payload
      );
    },
    updateAssignment: (state, action: PayloadAction<Assignment>) => {
      state.assignments = state.assignments.map((assignment) =>
        assignment._id === action.payload._id ? action.payload : assignment
      );
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
        state.assignments = [...state.assignments, action.payload];
        state.error = null;
      })
      .addCase(updateAssignmentAsync.fulfilled, (state, action) => {
        state.assignments = state.assignments.map((assignment) =>
          assignment._id === action.payload._id ? action.payload : assignment
        );
        state.error = null;
      })
      .addCase(deleteAssignmentAsync.fulfilled, (state, action) => {
        state.assignments = state.assignments.filter(
          (assignment) => assignment._id !== action.payload
        );
        state.error = null;
      })
      .addCase(createAssignmentAsync.rejected, (state, action) => {
        state.error = action.error.message ?? "Unable to save assignment changes.";
      })
      .addCase(updateAssignmentAsync.rejected, (state, action) => {
        state.error = action.error.message ?? "Unable to save assignment changes.";
      })
      .addCase(deleteAssignmentAsync.rejected, (state, action) => {
        state.error = action.error.message ?? "Unable to save assignment changes.";
      });
  },
});

export const { addAssignment, deleteAssignment, updateAssignment } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;
