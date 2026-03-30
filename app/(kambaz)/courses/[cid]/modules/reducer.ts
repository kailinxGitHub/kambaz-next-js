import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "@/lib/kambaz/client-api";
import type { Module } from "@/lib/kambaz/client-api";

type ModuleRow = Module & { editing?: boolean };

const initialState = {
  modules: [] as ModuleRow[],
  status: "idle",
  error: null as string | null,
};

export const fetchModulesForCourse = createAsyncThunk(
  "modules/fetchModulesForCourse",
  async (courseId: string) => api.findModulesForCourse(courseId)
);

export const createModuleAsync = createAsyncThunk(
  "modules/createModuleAsync",
  async ({
    courseId,
    module,
  }: {
    courseId: string;
    module: { name: string; lessons?: { _id: string; name: string }[] };
  }) => api.createModuleForCourse(courseId, module)
);

export const saveModuleAsync = createAsyncThunk(
  "modules/saveModuleAsync",
  async (module: ModuleRow) =>
    api.updateModule({
      ...module,
      name: module.name ?? module.title ?? "",
    })
);

export const deleteModuleAsync = createAsyncThunk(
  "modules/deleteModuleAsync",
  async (moduleId: string) => {
    await api.deleteModule(moduleId);
    return moduleId;
  }
);

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    editModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.map((module) =>
        module._id === moduleId
          ? { ...module, editing: true }
          : { ...module, editing: false }
      );
    },
    updateModule: (state, { payload: module }) => {
      state.modules = state.modules.map((currentModule) =>
        currentModule._id === module._id ? { ...currentModule, ...module } : currentModule
      );
    },
    setModules: (state, action) => {
      state.modules = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchModulesForCourse.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchModulesForCourse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.modules = action.payload;
      })
      .addCase(fetchModulesForCourse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unable to load modules.";
      })
      .addCase(createModuleAsync.fulfilled, (state, action) => {
        state.modules = [...state.modules, action.payload];
      })
      .addCase(saveModuleAsync.fulfilled, (state, action) => {
        state.modules = state.modules.map((module) =>
          module._id === action.payload._id
            ? { ...action.payload, editing: false }
            : module
        );
      })
      .addCase(deleteModuleAsync.fulfilled, (state, action) => {
        state.modules = state.modules.filter(
          (module) => module._id !== action.payload
        );
      });
  },
});
export const { editModule, updateModule, setModules } = modulesSlice.actions;
export default modulesSlice.reducer;
