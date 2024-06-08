/*
  Warnings:

  - You are about to drop the column `teckStack` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `teckStack`,
    ADD COLUMN `techStack` VARCHAR(191) NOT NULL DEFAULT '';
