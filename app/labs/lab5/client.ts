import axios from "axios";
import { getHttpErrorMessage as getHttpErr } from "@/lib/http-error";

export type Assignment = {
  id: number;
  title: string;
  description: string;
  score: number;
  completed: boolean;
};

export type ModuleData = {
  id: number;
  name: string;
  description: string;
};

export type Todo = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};

export const HTTP_SERVER =
  process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

const LAB5_API = `${HTTP_SERVER}/lab5`;
const ASSIGNMENT_API = `${LAB5_API}/assignment`;
const MODULE_API = `${LAB5_API}/module`;
const TODOS_API = `${LAB5_API}/todos`;

export async function fetchWelcomeMessage() {
  const response = await axios.get<string>(`${LAB5_API}/welcome`);
  return response.data;
}

export async function fetchAssignment() {
  const response = await axios.get<Assignment>(ASSIGNMENT_API);
  return response.data;
}

export async function updateTitle(newTitle: string) {
  const response = await axios.get<Assignment>(
    `${ASSIGNMENT_API}/title/${encodeURIComponent(newTitle)}`
  );
  return response.data;
}

export async function updateAssignmentScore(newScore: number) {
  const response = await axios.get<Assignment>(
    `${ASSIGNMENT_API}/score/${newScore}`
  );
  return response.data;
}

export async function updateAssignmentCompleted(completed: boolean) {
  const response = await axios.get<Assignment>(
    `${ASSIGNMENT_API}/completed/${completed}`
  );
  return response.data;
}

export async function fetchModule() {
  const response = await axios.get<ModuleData>(MODULE_API);
  return response.data;
}

export async function updateModuleName(newName: string) {
  const response = await axios.get<ModuleData>(
    `${MODULE_API}/name/${encodeURIComponent(newName)}`
  );
  return response.data;
}

export async function updateModuleDescription(newDescription: string) {
  const response = await axios.get<ModuleData>(
    `${MODULE_API}/description/${encodeURIComponent(newDescription)}`
  );
  return response.data;
}

export async function fetchTodos(completed?: boolean) {
  const url =
    completed === undefined ? TODOS_API : `${TODOS_API}?completed=${completed}`;
  const response = await axios.get<Todo[]>(url);
  return response.data;
}

export async function createNewTodo() {
  const response = await axios.get<Todo[]>(`${TODOS_API}/create`);
  return response.data;
}

export async function removeTodo(id: number) {
  const response = await axios.get<Todo[]>(`${TODOS_API}/${id}/delete`);
  return response.data;
}

export async function postNewTodo(todo: Partial<Todo>) {
  const response = await axios.post<Todo>(TODOS_API, todo);
  return response.data;
}

export async function deleteTodo(id: number) {
  await axios.delete(`${TODOS_API}/${id}`);
}

export async function updateTodo(todo: Todo) {
  await axios.put(`${TODOS_API}/${todo.id}`, todo);
}

export function getErrorMessage(error: unknown) {
  return getHttpErr(error);
}
