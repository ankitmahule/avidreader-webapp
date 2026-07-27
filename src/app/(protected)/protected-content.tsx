"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "@/utils/store";

export default function ProtectedContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  useEffect(() => {
    if (!userInfo) {
      router.replace("/");
    }
  }, [userInfo, router]);

  if (!userInfo) {
    return null;
  }

  return children;
}
