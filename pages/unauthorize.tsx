import { useEffect } from "react";
import { useRouter } from "next/router";
import { unauthorize, authorized } from "../sibyl";

export default function Unauthorize() {
  const router = useRouter();

  useEffect(() => {
    if (!authorized()) {
      router.replace("/authorize");
      return;
    }

    unauthorize();

    router.replace("/authorize");
  });

  return <></>;
}
