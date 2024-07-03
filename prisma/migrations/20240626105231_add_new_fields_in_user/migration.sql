/*
  Warnings:

  - You are about to drop the column `hateUserList` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `likeUserList` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Room` DROP COLUMN `hateUserList`,
    DROP COLUMN `likeUserList`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `hateUserList` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `likeUserList` VARCHAR(191) NOT NULL DEFAULT '';
