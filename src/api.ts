const API_BASE = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL ?? "/api"
  : "/api";

export async function buyCorn(clientId: string) {
  const res = await fetch(`${API_BASE}/buy`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-client-id": clientId },
    body: JSON.stringify({}),
  });
  const data = await res.json();
  const retryAfterHeader = res.headers.get("retry-after");
  const retryAfter = retryAfterHeader
    ? parseInt(retryAfterHeader, 10)
    : undefined;
  return { status: res.status, data, retryAfter };
}
