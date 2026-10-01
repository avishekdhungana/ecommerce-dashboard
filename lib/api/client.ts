import { API_BASE_URL } from "@/lib/constants";
import { ApiError, getFriendlyErrorMessage } from "@/lib/api/errors";

export async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      cache: "no-store",
      headers: {
        ...(options?.body ? { "Content-Type": "application/json" } : {}),
        ...options?.headers,
      },
    });
  } catch {
    throw new ApiError("Network error. Please check your connection.", 0);
  }

  if (!response.ok) {
    const status = response.status;
    const message = getFriendlyErrorMessage(status, "Request failed.");
    throw new ApiError(message, status);
  }

  const text = await response.text();
  if (!text.trim()) {
    return undefined as T;
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new ApiError("The response from the server was invalid.", 500);
  }
}
