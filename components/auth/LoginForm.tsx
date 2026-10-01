"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Input } from "@/components/ui/Input";
import { getUser } from "@/lib/api/users";
import { login } from "@/lib/api/auth";
import { getUserIdFromToken } from "@/lib/utils/jwt";
import { useAuthStore } from "@/store/authStore";
import type { User } from "@/types/user";

interface LoginFormProps {
  demoUsers: User[];
}

export function LoginForm({ demoUsers }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login: setAuth, setUserName } = useAuthStore();
  const [username, setUsername] = useState("vrit");
  const [password, setPassword] = useState("1234");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirect = useMemo(() => {
    const target = searchParams.get("redirect");
    return target && target.startsWith("/") ? target : "/products";
  }, [searchParams]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await login(username.trim(), password);
      setAuth(response.token);

      const userId = getUserIdFromToken(response.token);
      if (userId !== null) {
        try {
          const user = await getUser(userId);
          setUserName(user.name);
        } catch {
          setUserName(null);
        }
      } else {
        setUserName(null);
      }

      router.replace(redirect);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed. Please try again.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6 py-10">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-blue-600">Welcome back</p>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">Log in</h1>
        </div>

        {demoUsers.length > 0 ? (
          <div className="mb-4 rounded-md border border-blue-100 bg-blue-50 p-3 text-sm text-blue-700">
            <p className="font-medium">Demo credentials</p>
            {demoUsers.slice(0, 2).map((user) => (
              <p key={user.id}>
                <span className="font-semibold">{user.username}</span> / {user.password}
              </p>
            ))}
          </div>
        ) : null}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input label="Email or Username" value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" />
          <Input label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" />

          {error ? <ErrorMessage message={error} /> : null}

          <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}>
            Login
          </Button>
        </form>
      </div>
    </main>
  );
}
