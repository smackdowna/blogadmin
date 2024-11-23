"use client";

import { selectCurrentUser } from "@/redux/features/Auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type TUser = {
    _id: string;
    full_name: string;
    email: string;
  };

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
    const user = useAppSelector(selectCurrentUser) as TUser | null;
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
