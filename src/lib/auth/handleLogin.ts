"use client";

import { signIn } from "next-auth/react";

export async function handleLogin(email: string, password: string) {
  const res = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });
  console.log("dados", email )

  if (res?.error) {
    console.log(res)
    throw new Error("Email ou senha inválidos");
  }
}
