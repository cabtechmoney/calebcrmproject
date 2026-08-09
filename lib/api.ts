const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const details = await response.text().catch(() => "");
    throw new Error(`API request failed: ${response.status} ${response.statusText} ${details}`);
  }

  return response.json() as Promise<T>;
}
