import { createCookie } from "remix";

export const authCookie = createCookie("auth", {
  secrets: [process.env.SECRET_KEY_BASE as string],
  sameSite: "lax",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge: 604_800, // one week,
});
