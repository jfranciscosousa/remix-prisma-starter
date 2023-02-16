import { User } from "@prisma/client";
import z from "zod";
import { encryptPassword, verifyPassword } from "./passwordUtils.server";
import prisma from "./utils/prisma.server";
import { DataResult } from "./utils/types";
import errorsFromSchema from "./validate.server";

const createUserParams = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string(),
  passwordConfirmation: z.string(),
});

export type CreateUserParams = z.infer<typeof createUserParams>;

export async function findUserByEmail(
  email: string
): Promise<Omit<User, "password"> | null> {
  const user = await prisma.user.findUnique({ where: { email } });

  if (user) user.password = "";

  return user;
}

export async function createUser({
  email,
  name,
  password,
  passwordConfirmation,
}: CreateUserParams): Promise<DataResult<Omit<User, "password">>> {
  const errors = errorsFromSchema(createUserParams, {
    email,
    name,
    password,
    passwordConfirmation,
  });

  if (errors) return { errors };

  if (password !== passwordConfirmation) {
    return {
      errors: { passwordConfirmation: "Passwords do not match!" },
    };
  }

  if (await findUserByEmail(email)) {
    return {
      errors: { email: "User already exists!" },
    };
  }

  const encryptedPassword = await encryptPassword(password);
  const user = await prisma.user.create({
    data: { email, name, password: encryptedPassword },
  });

  user.password = "";

  return { data: user };
}

const updateUserParams = z.object({
  email: z.string().email().optional(),
  name: z.string().optional(),
  currentPassword: z.string(),
  newPassword: z.string().optional(),
  passwordConfirmation: z.string().optional(),
});

export type UpdateUserParams = z.infer<typeof updateUserParams>;

export async function updateUser(
  user: User,
  {
    email,
    name,
    currentPassword,
    newPassword,
    passwordConfirmation,
  }: UpdateUserParams
): Promise<DataResult<Omit<User, "password">>> {
  if (newPassword !== passwordConfirmation) {
    return { errors: { passwordConfirmation: "Passwords do not match" } };
  }

  const errors = errorsFromSchema(updateUserParams, {
    email,
    name,
    currentPassword,
    newPassword,
  });

  if (errors) return { errors };

  if (!(await verifyPassword(user.password, currentPassword))) {
    return { errors: { currentPassword: "Wrong password" } };
  }

  const encryptedPassword = newPassword
    ? await encryptPassword(newPassword)
    : undefined;
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: { email, name, password: encryptedPassword },
  });

  if (updatedUser) updatedUser.password = "";

  return { data: updatedUser };
}

export async function deleteUser(user: User): Promise<Omit<User, "password">> {
  const [_, deletedUser] = await prisma.$transaction([
    prisma.note.deleteMany({ where: { userId: user.id } }),
    prisma.user.delete({ where: { id: user.id } }),
  ]);

  if (deletedUser) deletedUser.password = "";

  return deletedUser;
}
