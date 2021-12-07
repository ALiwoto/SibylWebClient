import { useRouter } from "next/router";
import { useEffect } from "react";
import Loader from "../components/Loader";

export default function Rest() {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  });

  return <Loader />;
}
