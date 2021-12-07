import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../contexts/auth";
import Loader from "./Loader";

export default function RequiresAuthentication({ children }) {
  const router = useRouter();
  const auth = useAuth();

  if (auth.authenticated) {
    return { children };
  }

  useEffect(() => {
    router.push("/authenticate");
  });

  return (
    <>
      <Loader />
    </>
  );
}
