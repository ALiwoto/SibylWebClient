import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { authorized, send } from "../../sibyl";
import Link from "next/link";

export default function Check() {
  const router = useRouter();
  const [userId, setUserId] = useState(0);
  const [result, setResult] = useState("");

  useEffect(() => {
    if (!authorized()) {
      router.replace("/authorize");
    }
  });

  useEffect(() => {
    (async () => {
      if (!router.isReady) {
        return;
      }

      const userid = Number(router.query.userId);

      setUserId(userid);

      const result = await send("getInfo", { userid });

      if (result.error) {
        setResult(`Error ${result.error.code}: ${result.error.message}`);
        return;
      }

      setResult(
        Object.entries(result.result)
          .filter(([_, value]: [string, string | number | boolean]) =>
            typeof value === "string" ? value.length != 0 : true
          )
          .map(
            ([key, value]: [string, string | number | boolean]) =>
              `${key
                .replace(/_/g, " ")
                .replace(
                  /\w\S*/g,
                  (txt) =>
                    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
                )
                .replace(/Id/g, "ID")}: ${
                typeof value === "boolean" ? (value ? "yes" : "no") : value
              }`
          )
          .join("\n")
      );
    })();
  }, [router.isReady]);

  return (
    <>
      <h1 className="text-2xl mb-2">Stats for {userId}</h1>
      <p className="text-lg mb-2">
        {result.split("\n").map((result) => (
          <>
            {result} <br />
          </>
        ))}
      </p>
      <Link href="/check">
        <a className="border-b-2 border-gray-500 hover:bg-gray-500 hover:text-white">
          Check another ID
        </a>
      </Link>
    </>
  );
}
