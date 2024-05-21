/*
  Warnings:

  - You are about to drop the `userdeck` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `userdeck` DROP FOREIGN KEY `UserDeck_userId_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `NextBooster` VARCHAR(191) NOT NULL DEFAULT '0';

-- DropTable
DROP TABLE `userdeck`;
