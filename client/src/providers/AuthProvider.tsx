import useAuth from "@hooks/api/use-auth";
import { usePersistentState } from "@hooks/other/use-persistent-state";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";

type AuthProviderProps = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const { selfVerify } = useAuth();
  const [token] = usePersistentState("token");
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        selfVerify()
          .then()
          .catch(() => {
            router.replace("/splash");
          });
      }
    };
    initAuth();
  }, [token]);

  return <React.Fragment>{children}</React.Fragment>;
}
