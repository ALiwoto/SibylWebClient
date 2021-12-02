import { useRouter } from "next/router";
import { useEffect } from "react";
import { authorized } from "../sibyl";
import Link from "next/link";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    if (!authorized()) {
      router.replace("/authorize");
    }
  });

  return (
    <>
      <h1 className="text-2xl mb-2">Sibyl Web</h1>
      <ul className="list-disc ml-5">
        <li>
          <Link href="/check">
            <a className="border-b-2 border-gray-500 hover:bg-gray-500 hover:text-white">
              Check
            </a>
          </Link>
        </li>
        <li>
          <Link href="/unauthorize">
            <a className="border-b-2 border-gray-500 hover:bg-gray-500 hover:text-white">
              Unauthorize
            </a>
          </Link>
        </li>
      </ul>
    </>
  );
}
