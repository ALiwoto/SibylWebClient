import { NextPage } from "next";

export const formObj = (
  form: HTMLFormElement,
) => {
  return Object.fromEntries(new FormData(form).entries());
};

export const objQs = (obj: any) =>
  Object.entries(obj).map((
    [key, value]: [string, string],
  ) => encodeURIComponent(key) + "=" + encodeURIComponent(value)).join(
    "&",
  );
