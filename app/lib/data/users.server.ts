import { User } from "@prisma/client";
import { encryptPassword } from "./passwordUtils.server";
import prisma from "./prisma.server";

export interface UserParams {
  email: string;
  name: string;
  password: string;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const user = await prisma.user.findUnique({ where: { email } });

  if (user) user.password = "";

  return user;
}

export async function createUser({
  email,
  name,
  password,
}: UserParams): Promise<User> {
  const encryptedPassword = await encryptPassword(password);
  const user = await prisma.user.create({
    data: { email, name, password: encryptedPassword },
  });

  user.password = "";

  return user;
}

export async function updateUser(
  user: User,
  { email, name, password }: UserParams
) {
  const encryptedPassword = password
    ? await encryptPassword(password)
    : undefined;
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: { email, name, password: encryptedPassword },
  });

  if (updatedUser) {
    updatedUser.password = "";
  }

  return updatedUser;
}

export async function deleteUser(user: User): Promise<User> {
  const [_, deletedUser] = await prisma.$transaction([
    prisma.note.deleteMany({ where: { userId: user.id } }),
    prisma.user.delete({ where: { id: user.id } }),
  ]);

  if (deletedUser) deletedUser.password = "";

  return deletedUser;
}
