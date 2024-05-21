/*
  Warnings:

  - The primary key for the `card` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `card` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `card` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `quantity` INTEGER NOT NULL DEFAULT 1,
    MODIFY `imageUrl` VARCHAR(191) NOT NULL DEFAULT 'NULL',
    ADD PRIMARY KEY (`userId`, `cardId`);
