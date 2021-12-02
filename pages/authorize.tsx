import { useEffect } from "react";
import { useRouter } from "next/router";
import { z } from "zod";
import { send, authorize, authorized } from "../sibyl";
import { formObj } from "../utils";

export default function Authorize() {
  const router = useRouter();

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let { token, endpoint } = z
      .object({
        token: z.string().nonempty(),
        endpoint: z.string(),
      })
      .parse(formObj(event.currentTarget));

    endpoint = endpoint || "https://psychopass.animekaizoku.com/";

    console.log(endpoint);

    let valid;

    try {
      const { result } = await send("checkToken", { token }, { endpoint });
      valid = result;
    } catch (err) {
      alert(err.message || String(err));
      return;
    }

    if (!valid) {
      alert("Invalid token.");
      return;
    }

    authorize(token, endpoint.endsWith("/") ? endpoint : endpoint + "/");
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
        placeholder="Token*"
        className="block px-2 py-2 border-2 border-dark bg-light w-full mb-2"
      />
      <input
        type="text"
        id="endpoint"
        name="endpoint"
        placeholder="Endpoint"
        className="block px-2 py-2 border-2 border-dark bg-light w-full mb-2"
      />
      <button className="block px-2 py-2 text-light mx-auto w-full bg-dark hover:bg-dark-alt mb-2">
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
