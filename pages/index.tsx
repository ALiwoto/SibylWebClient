import { useRouter } from "next/router";
import { useEffect } from "react";
import { authorized } from "../sibyl";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    if (!authorized()) {
      router.replace("/authorize");
      return;
    }

    router.replace("/check");
  });

  return <></>;
}
