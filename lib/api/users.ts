import { request } from "@/lib/api/client";
import type { User } from "@/types/user";

export function getUsers(): Promise<User[]> {
  return request<User[]>("/users");
}

export function getUser(id: number): Promise<User> {
  return request<User>(`/users/${id}`);
}
