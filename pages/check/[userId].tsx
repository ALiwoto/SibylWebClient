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
          .map(
            ([key, value]: [string, string | number | boolean]) =>
              `${key}: ${
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
      <pre className="overflow-scroll text-lg mb-2">{result}</pre>
      <h1 className="text-2xl mb-2">Check another one</h1>
      <input
        className="block px-2 py-2 border-2 border-dark bg-light w-full mb-2"
        type="number"
        name="userId"
        id="userId"
        placeholder="User ID"
        value={userId || 0}
        onChange={(e) => setUserId(e.target.valueAsNumber)}
      />
      <Link href={`/check/${userId}`}>
        <button className="block px-2 py-2 text-light mx-auto w-full bg-dark hover:bg-dark-alt">
          Check
        </button>
      </Link>
    </>
  );
}
