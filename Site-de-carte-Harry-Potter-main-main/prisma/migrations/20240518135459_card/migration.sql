/*
  Warnings:

  - You are about to drop the column `ownerId` on the `card` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `card` DROP FOREIGN KEY `Card_ownerId_fkey`;

-- AlterTable
ALTER TABLE `card` DROP COLUMN `ownerId`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Card` ADD CONSTRAINT `Card_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
