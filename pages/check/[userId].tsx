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
      <input
        className="block px-2 py-2 border-2 border-gray-500 w-full mb-2"
        type="number"
        name="userId"
        id="userId"
        placeholder="User ID"
        value={userId || 0}
        onChange={(e) => setUserId(e.target.valueAsNumber)}
      />
      <Link href={`/check/${userId}`}>
        <button className="block px-2 py-2 text-white mx-auto w-full bg-gray-500 hover:bg-gray-600 mb-2">
          Check
        </button>
      </Link>
      <pre className="overflow-scroll text-lg">{result}</pre>
    </>
  );
}
