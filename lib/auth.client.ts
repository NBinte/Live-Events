// lib/auth.client.ts
"use client";

import { signIn } from "next-auth/react";

export function signInWithGoogle(options?: Parameters<typeof signIn>[1]) {
  return signIn("google", options);
}

export function signInWithFacebook(options?: Parameters<typeof signIn>[1]) {
  return signIn("facebook", options);
}

export function signInWithLine(options?: Parameters<typeof signIn>[1]) {
  return signIn("line", options);
}

export function signInWithEmail(options?: Parameters<typeof signIn>[1]) {
  return signIn("email", options);
}
