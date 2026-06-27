/**
 * Centralized application configuration.
 *
 * In production (Docker/K8s), the API is accessed via nginx reverse proxy
 * at the same origin (/api/v1/...), so no explicit URL is needed.
 *
 * In development (vite dev server), set VITE_API_URL to point to the
 * backend running locally (e.g. http://localhost:8080).
 */

export const config = {
  /** Base URL of the Task API backend (no trailing slash) */
  API_URL: import.meta.env.VITE_API_URL || '',
} as const;
