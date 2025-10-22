/*
  Warnings:

  - You are about to drop the column `name` on the `questions` table. All the data in the column will be lost.
  - Added the required column `text` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "questions" DROP COLUMN "name",
ADD COLUMN     "text" TEXT NOT NULL;
