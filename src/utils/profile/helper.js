const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const token = typeof window !== "undefined" ? document.cookie.split(';').find(c => c.trim().startsWith('token='))?.split('=')[1] : null

export async function getProfile() {
  // const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const res = await fetch(`${BASE_URL}/api/auth/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message ?? "Failed to fetch profile");
  }

  return data;
}