import { objQs } from "../utils";

export const send = async (
  method: string,
  data: any,
) => {
  const token = localStorage.getItem("token");

  if (!("token" in data)) {
    data = { ...data, token };
  }

  return await (await fetch(
    "https://psychopass.animekaizoku.com/" +
      method + "?" +
      objQs(data),
    {
      method: "GET",
    },
  )).json();
};
