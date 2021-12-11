/*
  Warnings:

  - Added the required column `orderNumber` to the `PollOption` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PollOption" ADD COLUMN     "orderNumber" INTEGER NOT NULL;
