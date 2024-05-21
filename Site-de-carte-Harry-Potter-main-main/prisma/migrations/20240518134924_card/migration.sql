/*
  Warnings:

  - Added the required column `quantity` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `card` ADD COLUMN `quantity` INTEGER NOT NULL;
