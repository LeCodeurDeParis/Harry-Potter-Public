/*
  Warnings:

  - Added the required column `cardId` to the `UserDeck` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `userdeck` ADD COLUMN `cardId` INTEGER NOT NULL;
