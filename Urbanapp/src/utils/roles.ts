export type UserRole = "admin" | "citizen";

export const ROLES = {
  ADMIN: "admin" as UserRole,
  CITIZEN: "citizen" as UserRole,
};

export const DEFAULT_ROLE = ROLES.CITIZEN;

export function hasRequiredRole(
  userRole: string | undefined,
  requiredRole: UserRole
): boolean {
  if (!userRole) return false;
  if (requiredRole === ROLES.CITIZEN) return true; // Citizens can access citizen-only routes
  if (requiredRole === ROLES.ADMIN && userRole === ROLES.ADMIN) return true;
  return false;
}
