"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { loginAction, type LoginState } from "@/app/admin/login/actions";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction] = useActionState(loginAction, {
    status: "idle",
    message: "",
  } satisfies LoginState);

  const isSuccess = state.status === "success";

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label
          htmlFor="username"
          className="mb-2 block text-sm font-semibold text-primary-charcoal"
        >
          Username
        </label>
        <input
          autoComplete="username"
          className="min-h-12 w-full rounded-xl border border-primary-charcoal/15 bg-white px-4 text-sm text-primary-charcoal outline-none transition placeholder:text-primary-charcoal/35 hover:border-primary-charcoal/30 focus:border-primary-yellow focus:ring-4 focus:ring-primary-yellow/15"
          id="username"
          name="username"
          placeholder="Masukkan username"
          required
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-semibold text-primary-charcoal"
        >
          Password
        </label>
        <div className="relative">
          <input
            autoComplete="current-password"
            className="min-h-12 w-full rounded-xl border border-primary-charcoal/15 bg-white py-3 pl-4 pr-14 text-sm text-primary-charcoal outline-none transition placeholder:text-primary-charcoal/35 hover:border-primary-charcoal/30 focus:border-primary-yellow focus:ring-4 focus:ring-primary-yellow/15"
            id="password"
            name="password"
            placeholder="Masukkan password"
            required
            type={showPassword ? "text" : "password"}
          />
          <button
            aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
            aria-pressed={showPassword}
            className="absolute inset-y-0 right-2 my-auto inline-flex size-10 items-center justify-center rounded-lg text-primary-charcoal/60 transition hover:bg-primary-charcoal/5 hover:text-primary-charcoal focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary-yellow"
            onClick={() => setShowPassword((visible) => !visible)}
            type="button"
          >
            {showPassword ? (
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5">
                <path d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5.2 0 8.5 5 9.3 6.5a1 1 0 0 1 0 1A15 15 0 0 1 18 16m-3.2 2.4A10 10 0 0 1 12 19c-5.2 0-8.5-5-9.3-6.5a1 1 0 0 1 0-1 16 16 0 0 1 3.1-3.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5">
                <path d="M2.7 12s3.3-6.5 9.3-6.5 9.3 6.5 9.3 6.5-3.3 6.5-9.3 6.5S2.7 12 2.7 12Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {state.message ? (
        <p
          aria-live="polite"
          className={`rounded-xl border px-4 py-3 text-sm leading-5 ${
            isSuccess
              ? "border-green-700/20 bg-green-700/5 text-green-800"
              : "border-accent-red/20 bg-accent-red/5 text-accent-red"
          }`}
          role={isSuccess ? "status" : "alert"}
        >
          {state.message}
        </p>
      ) : null}

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="group flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary-yellow px-5 py-3 text-sm font-bold text-primary-charcoal shadow-sm transition hover:bg-primary-yellow/90 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary-charcoal active:translate-y-px disabled:cursor-wait disabled:opacity-70"
      disabled={pending}
      type="submit"
    >
      {pending ? "Memeriksa…" : "Masuk"}
      {!pending ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          className="size-4 transition-transform group-hover:translate-x-0.5"
        >
          <path d="M3.75 10h12.5m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : null}
    </button>
  );
}
