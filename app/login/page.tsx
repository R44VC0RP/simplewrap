"use client";

import { useEffect } from "react";
import { signIn } from "@/lib/auth-client";

export default function LoginPage() {
  useEffect(() => {
    const startLogin = async () => {
      try {
        await signIn.social({ provider: "twitter" });
      } catch (error) {
        console.error("Login failed:", error);
      }
    };
    startLogin();
  }, []);

  return null;
}


