import { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { getUsers } from "@/lib/api/users";
import type { User } from "@/types/user";

async function getDemoUsers(): Promise<User[]> {
  try {
    return await getUsers();
  } catch {
    return [];
  }
}

export default async function LoginPage() {
  const demoUsers = await getDemoUsers();

  return (
    <Suspense fallback={<main className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-10 text-gray-500">Loading...</main>}>
      <LoginForm demoUsers={demoUsers} />
    </Suspense>
  );
}
