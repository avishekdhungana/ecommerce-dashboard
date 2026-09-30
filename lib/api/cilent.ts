import { API_BASE_URL } from "@/lib/api/constants";
import { ApiError } from "./error";

export async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  } catch {
    throw new ApiError("Network error. Please check your connection.", 0);
  }

  if (!response.ok) {
    throw new ApiError("Request failed", response.status);
  }

  const text = await response.text();
  if (!text.trim()) {
    throw new ApiError("Not found", 404);
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new ApiError("Invalid response from server", 500);
  }
}