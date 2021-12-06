import { z } from "zod";
import { send } from "../sibyl";
import { formObj } from "../utils";
import RequiresNoAuthentication from "../components/RequiresNoAuthentication";
import { useAuth } from "../contexts/auth";

export default function Authenticate() {
  const { authenticate } = useAuth();

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let token = z.string().nonempty().parse(formObj(event.currentTarget).token);

    const { result: valid } = await send("checkToken", { token });

    if (!valid) {
      alert("Invalid token.");
      return;
    }

    authenticate(token);
  };

  return (
    <RequiresNoAuthentication>
      <form onSubmit={submit}>
        <input
          type="password"
          id="token"
          name="token"
          placeholder="Token*"
          className="block px-2 py-2 border-2 border-dark bg-light w-full mb-2"
        />
        <button className="block px-2 py-2 text-light mx-auto w-full bg-dark hover:bg-dark-alt mb-2">
          Authenticate
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
    </RequiresNoAuthentication>
  );
}
