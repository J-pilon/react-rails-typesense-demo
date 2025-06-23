const API_BASE = 'http://localhost:3000';

export async function fetchTasks() {
  const res = await fetch(`${API_BASE}/tasks`);
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
}

export async function createTask(data) {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task: data }),
  });
  return res.json();
}

export async function updateTask(id, data) {
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task: data }),
  });
  return res.json();
}

export async function deleteTask(id) {
  await fetch(`${API_BASE}/tasks/${id}`, { method: 'DELETE' });
}

export async function fetchTask(id) {
  const res = await fetch(`${API_BASE}/tasks/${id}`);
  return res.json();
}
