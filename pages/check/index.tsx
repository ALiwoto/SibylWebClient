import React, { useState } from "react";
import Link from "next/link";
import RequiresAuthentication from "../../components/RequiresAuthentication";

export default function Index() {
  const [userId, setUserId] = useState(0);

  return (
    <RequiresAuthentication>
      <input
        className="block px-2 py-2 border-2 border-dark bg-light w-full mb-2"
        type="number"
        name="userId"
        id="userId"
        placeholder="User ID"
        value={userId || ""}
        onChange={(e) => setUserId(e.target.valueAsNumber)}
      />
      <Link href={`/check/${userId}`}>
        <button className="block px-2 py-2 text-light mx-auto w-full bg-dark hover:bg-dark-alt">
          Check
        </button>
      </Link>
    </RequiresAuthentication>
  );
}
