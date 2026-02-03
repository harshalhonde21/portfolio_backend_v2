export const CACHE_TTL = 300; // 5 minutes
export const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
export const RATE_LIMIT_MAX = 100; // Limit each IP to 100 requests per windowMs

export const ROLES = {
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
} as const;

export type Role = keyof typeof ROLES;
