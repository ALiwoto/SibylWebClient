import Link from "next/link";
import RequiresAuthentication from "../components/RequiresAuthentication";

export default function Index() {
  return (
    <RequiresAuthentication>
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
          <Link href="/unauthenticate">
            <a className="border-b-2 border-gray-500 hover:bg-gray-500 hover:text-white">
              Unauthenticate
            </a>
          </Link>
        </li>
      </ul>{" "}
    </RequiresAuthentication>
  );
}
