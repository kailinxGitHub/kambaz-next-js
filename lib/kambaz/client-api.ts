const getHeaders = (role?: string | null) => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (role) {
    headers["x-user-role"] = role;
  }

  return headers;
};

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    let message = "Request failed.";

    try {
      const data = await response.json();
      message = data.error ?? message;
    } catch {
      // Ignore JSON parse failures and use the default message.
    }

    throw new Error(message);
  }

  return (await response.json()) as T;
};

export const getCourses = async () => {
  const response = await fetch("/api/courses");
  return handleResponse<any[]>(response);
};

export const createCourse = async (course: any, role?: string | null) => {
  const response = await fetch("/api/courses", {
    method: "POST",
    headers: getHeaders(role),
    body: JSON.stringify(course),
  });
  return handleResponse<any>(response);
};

export const updateCourse = async (course: any, role?: string | null) => {
  const response = await fetch(`/api/courses/${course._id}`, {
    method: "PUT",
    headers: getHeaders(role),
    body: JSON.stringify(course),
  });
  return handleResponse<any>(response);
};

export const deleteCourse = async (courseId: string, role?: string | null) => {
  const response = await fetch(`/api/courses/${courseId}`, {
    method: "DELETE",
    headers: getHeaders(role),
  });
  return handleResponse<{ courseId: string }>(response);
};

export const getAssignments = async () => {
  const response = await fetch("/api/assignments");
  return handleResponse<any[]>(response);
};

export const createAssignment = async (
  assignment: any,
  role?: string | null
) => {
  const response = await fetch("/api/assignments", {
    method: "POST",
    headers: getHeaders(role),
    body: JSON.stringify(assignment),
  });
  return handleResponse<any>(response);
};

export const updateAssignment = async (
  assignment: any,
  role?: string | null
) => {
  const response = await fetch(`/api/assignments/${assignment._id}`, {
    method: "PUT",
    headers: getHeaders(role),
    body: JSON.stringify(assignment),
  });
  return handleResponse<any>(response);
};

export const deleteAssignment = async (
  assignmentId: string,
  role?: string | null
) => {
  const response = await fetch(`/api/assignments/${assignmentId}`, {
    method: "DELETE",
    headers: getHeaders(role),
  });
  return handleResponse<{ assignmentId: string }>(response);
};
