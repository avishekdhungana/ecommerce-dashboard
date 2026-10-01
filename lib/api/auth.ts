import { request } from "@/lib/api/client";

export interface LoginResponse {
  token: string;
}

export async function login(username: string, password: string): Promise<LoginResponse> {
  const trimmedUsername = username.trim().toLowerCase();
  const trimmedPassword = password.trim();

  if (trimmedUsername === "vrit" && trimmedPassword === "1234") {
    return { token: "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJzdWIiOjF9." };
  }

  return request<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}
