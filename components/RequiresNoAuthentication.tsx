import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../contexts/auth";
import Loader from "./Loader";

export default function RequiresNoAuthentication({ children }) {
  const router = useRouter();
  const auth = useAuth();

  useEffect(() => {
    if (auth.authenticated) {
      router.push("/");
    }
  });

  return <>{auth.authenticated ? <Loader /> : children}</>;
}
