"use client";

import { useEffect } from "react";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const doLogout = async () => {
      try {
        await signOut();
      } catch (error) {
        console.error("Logout failed:", error);
      } finally {
        router.replace("/");
      }
    };
    doLogout();
  }, [router]);

  return null;
}


