const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:5000/api"
).replace(/\/$/, "");

export async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const token = typeof window === "undefined" ? null : window.localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const details = await response.json().catch(() => null) as { message?: string } | null;
    throw new Error(details?.message || `Request failed (${response.status}). Please try again.`);
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}
