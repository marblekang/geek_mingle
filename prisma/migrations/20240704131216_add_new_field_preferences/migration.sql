/*
  Warnings:

  - Added the required column `preferences` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `preferences` VARCHAR(191) NOT NULL;
