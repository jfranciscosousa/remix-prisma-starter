import { User } from "@prisma/client";
import { InferType, object, string } from "yup";
import { encryptPassword, verifyPassword } from "./passwordUtils.server";
import prisma from "./prisma.server";
import { DataResult } from "./types";
import errorsFromSchema from "./validate.server";

const createUserParams = object({
  email: string().email().required(),
  name: string().required(),
  password: string().required(),
  passwordConfirmation: string().required(),
});

export type CreateUserParams = InferType<typeof createUserParams>;

export async function findUserByEmail(email: string): Promise<User | null> {
  const user = await prisma.user.findUnique({ where: { email } });

  if (user) user.password = "";

  return user;
}

export async function createUser({
  email,
  name,
  password,
  passwordConfirmation,
}: CreateUserParams): Promise<DataResult<User>> {
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

const updateUserParams = object({
  email: string().email(),
  name: string(),
  currentPassword: string().required(),
  newPassword: string(),
});

export type UpdateUserParams = InferType<typeof updateUserParams>;

export async function updateUser(
  user: User,
  { email, name, currentPassword, newPassword }: UpdateUserParams
): Promise<DataResult<User>> {
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

export async function deleteUser(user: User): Promise<User> {
  const [_, deletedUser] = await prisma.$transaction([
    prisma.note.deleteMany({ where: { userId: user.id } }),
    prisma.user.delete({ where: { id: user.id } }),
  ]);

  if (deletedUser) deletedUser.password = "";

  return deletedUser;
}
