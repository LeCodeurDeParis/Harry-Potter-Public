/*
  Warnings:

  - You are about to drop the column `NextBooster` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `NextBooster`,
    ADD COLUMN `LastBooster` VARCHAR(191) NOT NULL DEFAULT '0';
