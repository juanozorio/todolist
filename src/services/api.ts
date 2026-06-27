import { config } from '../config';

const BASE_URL = `${config.API_URL}/api/v1`;

/**
 * Task as returned by the backend API.
 */
export interface TaskDTO {
  id: string;
  description: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Payload for creating a new task.
 */
export interface CreateTaskPayload {
  description: string;
}

/**
 * Payload for updating an existing task.
 */
export interface UpdateTaskPayload {
  description?: string;
  isCompleted?: boolean;
}

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`API ${res.status}: ${body}`);
  }

  return res.json();
}

// ---------------------------------------------------------------------------
// Task API
// ---------------------------------------------------------------------------

/** List all tasks. */
export function listTasks(): Promise<TaskDTO[]> {
  return request<TaskDTO[]>('/tasks');
}

/** Create a new task. */
export function createTask(payload: CreateTaskPayload): Promise<TaskDTO> {
  return request<TaskDTO>('/tasks', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/** Update an existing task. */
export function updateTask(
  id: string,
  payload: UpdateTaskPayload,
): Promise<TaskDTO> {
  return request<TaskDTO>(`/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

/** List tasks filtered by completion status. */
export function listTasksByStatus(completed: boolean): Promise<TaskDTO[]> {
  return request<TaskDTO[]>(`/tasks/status?completed=${completed}`);
}

/** Get a single task by ID. */
export function getTask(id: string): Promise<TaskDTO> {
  return request<TaskDTO>(`/tasks/${id}`);
}
