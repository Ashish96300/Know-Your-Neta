"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/app/store/AuthStore";
import { Lock, Mail, Loader2, AlertCircle, Vote } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "/api/user/login",
        { email, password },
        { withCredentials: true }
      );

      const user = res.data.data;
      if (typeof setUser === "function") {
        setUser(user);
      }

      if (user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err:unknown) {
      const message =
        (err instanceof Error ? err.message : null) ||
        "Invalid credentials. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col md:flex-row font-sans bg-[#1A1A2E] text-white justify-center">
    <Card className="w-full max-w-sm rounded-2xl border border-[#0F3460]/80 bg-[#16213E]/30 p-2 text-[#F9F9F9] shadow-2xl shadow-black/40 backdrop-blur-md">
      <CardHeader className="space-y-2 text-center pb-4">
        {/* Brand Icon */}
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-[#0F3460]/60 border border-[#0F3460] text-[#E94560] shadow-md">
          <Vote className="size-6" />
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight text-[#F9F9F9]">
          Know Your Neta
        </CardTitle>
        <CardDescription className="text-xs text-[#F9F9F9]/60">
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {/* Error Message Box */}
          {error && (
            <div className="flex items-center gap-2 rounded-lg border border-[#E94560]/40 bg-[#E94560]/10 p-2.5 text-xs text-[#E94560]">
              <AlertCircle className="size-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs font-medium text-[#F9F9F9]/80">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 size-4 text-[#F9F9F9]/40" />
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-[#0F3460] bg-[#1A1A2E]/80 pl-9 text-sm text-[#F9F9F9] placeholder:text-[#F9F9F9]/30 focus-visible:border-[#E94560] focus-visible:ring-[#E94560]/20"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-xs font-medium text-[#F9F9F9]/80">
                Password
              </Label>
              <a
                href="/forgot-password"
                className="text-[11px] text-[#E94560] hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 size-4 text-[#F9F9F9]/40" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-[#0F3460] bg-[#1A1A2E]/80 pl-9 text-sm text-[#F9F9F9] placeholder:text-[#F9F9F9]/30 focus-visible:border-[#E94560] focus-visible:ring-[#E94560]/20"
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 pt-2">
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E94560] text-sm font-semibold text-[#F9F9F9] shadow-md transition-all hover:bg-[#E94560]/90 active:scale-[0.98]"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                Logging in...
              </span>
            ) : (
              "Sign In"
            )}
          </Button>

          <Button
            variant="outline"
            type="button"
            className="w-full border-[#0F3460] bg-[#1A1A2E]/60 text-xs font-medium text-[#F9F9F9] hover:bg-[#0F3460]/40 hover:text-[#F9F9F9]"
          >
            Sign In with Google
          </Button>

          <div className="mt-2 text-center text-xs text-[#F9F9F9]/60">
            Dont have an account?{" "}
            <a href="/register" className="font-semibold text-[#E94560] hover:underline">
              Sign up
            </a>
          </div>
        </CardFooter>
      </form>
    </Card>
    </main>
  );
}