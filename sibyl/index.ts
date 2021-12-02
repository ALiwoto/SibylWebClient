import { objQs } from "../utils";

export const authorize = (token: string, endpoint: string) => {
  localStorage.setItem("token", token);
  localStorage.setItem("endpoint", endpoint);
};

export const unauthorize = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("endpoint");
};

export const authorized = () =>
  Boolean(localStorage.getItem("token") && localStorage.getItem("endpoint"));

export const send = async (
  method: string,
  data: any,
  opts?: { endpoint?: string },
) => {
  const token = localStorage.getItem("token");

  if (!("token" in data)) {
    data = { ...data, token };
  }

  return await (await fetch(
    (opts?.endpoint || localStorage.getItem("endpoint")) +
      method + "?" +
      objQs(data),
    {
      method: "GET",
    },
  )).json();
};
