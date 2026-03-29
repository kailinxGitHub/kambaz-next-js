export type AppUser = {
  _id?: string;
  role?: string | null;
};

export const STAFF_ROLES = ["FACULTY", "ADMIN", "TA", "INSTRUCTOR"] as const;

export const normalizeRole = (role?: string | null) =>
  role?.trim().toUpperCase() ?? "";

export const isStaffRole = (role?: string | null) =>
  STAFF_ROLES.includes(normalizeRole(role) as (typeof STAFF_ROLES)[number]);

export const canManageCourses = (user?: AppUser | null) => isStaffRole(user?.role);

export const canManageAssignments = (user?: AppUser | null) =>
  isStaffRole(user?.role);

export const canAccessCourse = (
  user?: AppUser | null,
  isEnrolled = false
) => !!user && (isStaffRole(user.role) || isEnrolled);

export const getRequestRole = (headers: Headers) =>
  normalizeRole(headers.get("x-user-role"));
