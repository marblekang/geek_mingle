/*
  Warnings:

  - Added the required column `jobs` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teckStack` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `jobs` JSON NOT NULL,
    ADD COLUMN `teckStack` JSON NOT NULL;
