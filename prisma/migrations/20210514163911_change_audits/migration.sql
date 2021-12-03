/*
  Warnings:

  - You are about to drop the column `methodName` on the `AuditEvent` table. All the data in the column will be lost.
  - Added the required column `url` to the `AuditEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `method` to the `AuditEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AuditEvent" DROP COLUMN "methodName",
ADD COLUMN     "url" TEXT NOT NULL,
ADD COLUMN     "method" TEXT NOT NULL;
