import { useEffect } from "react";
import { useRouter } from "next/router";
import { z } from "zod";
import { send, authorize, authorized } from "../sibyl";
import { formObj } from "../utils";

export default function Authorize() {
  const router = useRouter();

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = z
      .string()
      .nonempty()
      .parse(formObj(event.currentTarget).token);

    const { result: valid } = await send("checkToken", { token });

    if (!valid) {
      alert("Invalid token.");
      return;
    }

    authorize(token);
    router.replace("../");
  };

  useEffect(() => {
    if (authorized()) {
      router.replace("../");
    }
  });

  return (
    <form onSubmit={submit}>
      <input
        type="password"
        id="token"
        name="token"
        placeholder="Token"
        className="block px-2 py-2 border-2 border-gray-500 w-full mb-2"
      />
      <button className="block px-2 py-2 text-white mx-auto w-full bg-gray-500 hover:bg-gray-600 mb-2">
        Authorize
      </button>
      <p>
        Got no token?{" "}
        <a
          href="https://t.me/SibylRobot"
          className="border-b-2 border-gray-500 hover:bg-gray-500 hover:text-white"
        >
          Get one.
        </a>
      </p>
    </form>
  );
}
