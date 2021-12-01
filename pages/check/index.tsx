import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { authorized } from "../../sibyl";

export default function Index() {
  const router = useRouter();
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    if (!authorized()) {
      router.replace("/authorize");
    }
  });

  return (
    <>
      <input
        className="block px-2 py-2 border-2 border-gray-500 w-full mb-2"
        type="number"
        name="userId"
        id="userId"
        placeholder="User ID"
        value={userId || ""}
        onChange={(e) => setUserId(e.target.valueAsNumber)}
      />
      <Link href={`/check/${userId}`}>
        <button className="block px-2 py-2 text-white mx-auto w-full bg-gray-500 hover:bg-gray-600 mb-2">
          Check
        </button>
      </Link>
    </>
  );
}
