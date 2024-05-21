/*
  Warnings:

  - You are about to drop the column `cardId` on the `userdeck` table. All the data in the column will be lost.
  - Added the required column `name` to the `UserDeck` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `userdeck` DROP COLUMN `cardId`,
    ADD COLUMN `favourite` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
