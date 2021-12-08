import crypto from "crypto";
import { promisify } from "util";

const scrypt = promisify(crypto.scrypt);

export async function encryptPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(8).toString("hex");
  const derivedKey = (await scrypt(password, salt, 64)) as Buffer;

  return `${salt}:${derivedKey.toString("hex")}`;
}

export async function verifyPassword(
  hash: string,
  password: string
): Promise<boolean> {
  const [salt, key] = hash.split(":");
  const keyBuffer = Buffer.from(key, "hex");
  const derivedKey = (await scrypt(password, salt, 64)) as Buffer;

  return crypto.timingSafeEqual(keyBuffer, derivedKey);
}
