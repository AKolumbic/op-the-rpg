"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface AuthFormProps {
  mode: "sign-in" | "sign-up";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmationSent, setConfirmationSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "sign-up") {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;

        if (data.user && !data.session) {
          setConfirmationSent(true);
        } else {
          router.push("/dashboard");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/dashboard");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  // Confirmation screen after sign-up
  if (confirmationSent) {
    return (
      <div className="min-h-screen zoom-lines flex items-center justify-center px-4 relative">
        <div className="relative z-10 w-full max-w-sm text-center">
          <div className="speech-bubble mb-8">
            <p className="font-display text-2xl text-comic-cyan">Check Your Email</p>
            <p className="text-sm mt-2">
              We sent a confirmation link to{" "}
              <span className="font-semibold">{email}</span>.
              Click the link to activate your account.
            </p>
          </div>

          <div className="comic-panel p-4 text-left mb-6">
            <p className="text-sm font-display text-accent mb-2">What to expect:</p>
            <ul className="text-sm text-muted space-y-1">
              <li>&#9670; Check your inbox (and spam folder)</li>
              <li>&#9670; Click the confirmation link</li>
              <li>&#9670; Come back here and sign in</li>
            </ul>
          </div>

          <a
            href="/auth/sign-in"
            className="comic-btn bg-accent text-black block text-center"
          >
            Go to Sign In
          </a>

          <button
            onClick={() => {
              setConfirmationSent(false);
              setPassword("");
            }}
            className="block w-full mt-3 text-sm text-muted hover:text-foreground transition-colors"
          >
            Use a different email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen zoom-lines flex items-center justify-center px-4 relative">
      <div className="relative z-10 w-full max-w-sm">
        <h1 className="comic-title text-comic-yellow text-5xl text-center mb-1">
          OP
        </h1>
        <p className="font-display text-foreground/60 text-xl text-center tracking-widest mb-6">
          THE RPG
        </p>

        <div className="comic-panel p-6">
          <h2 className="font-display text-lg text-center mb-1 text-accent tracking-wide">
            {mode === "sign-in" ? "Sign In" : "Create Account"}
          </h2>

          {mode === "sign-up" && (
            <p className="text-center text-xs text-muted mb-4">
              Sign up to build and save your heroes. We&apos;ll send a
              confirmation email to verify your address.
            </p>
          )}

          {mode === "sign-in" && (
            <p className="text-center text-xs text-muted mb-4">
              Welcome back. Enter your credentials to continue.
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            autoComplete="on"
          >
            <div>
              <label htmlFor="email" className="block text-sm font-display tracking-wide mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full px-3 py-2 bg-background border-2 border-card-border focus:border-accent focus:outline-none shadow-[2px_2px_0_rgba(0,0,0,0.3)]"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-display tracking-wide mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                autoComplete={mode === "sign-up" ? "new-password" : "current-password"}
                className="w-full px-3 py-2 bg-background border-2 border-card-border focus:border-accent focus:outline-none shadow-[2px_2px_0_rgba(0,0,0,0.3)]"
              />
              {mode === "sign-up" && (
                <p className="text-xs text-muted mt-1">
                  Must be at least 6 characters.
                </p>
              )}
            </div>

            {error && (
              <p className="text-comic-red text-sm font-semibold">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="comic-btn w-full bg-accent text-black text-center disabled:opacity-50"
            >
              {loading
                ? "Loading..."
                : mode === "sign-in"
                ? "Sign In"
                : "Create Account"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-muted mt-6">
          {mode === "sign-in" ? (
            <>
              Don&apos;t have an account?{" "}
              <a href="/auth/sign-up" className="text-accent font-display hover:text-comic-yellow transition-colors">
                Sign up
              </a>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <a href="/auth/sign-in" className="text-accent font-display hover:text-comic-yellow transition-colors">
                Sign in
              </a>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
