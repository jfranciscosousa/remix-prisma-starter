import { Note } from "@prisma/client";
import prisma from "./utils/prisma.server";

export async function listNotes(userId: string): Promise<Note[]> {
  if (!userId) return [];

  return prisma.note.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
  });
}

export async function deleteNote(userId: string, id: string): Promise<boolean> {
  return (
    (await prisma.note.deleteMany({ where: { id, userId: userId } })).count > 1
  );
}

export async function createNote(
  userId: string,
  noteParams: { content: string },
) {
  return prisma.note.create({
    data: { ...noteParams, user: { connect: { id: userId } } },
  });
}
