/*
  Warnings:

  - Made the column `age` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `job` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `techStack` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `age` INTEGER NOT NULL,
    MODIFY `job` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `techStack` VARCHAR(191) NOT NULL DEFAULT '';
