/*
  Warnings:

  - You are about to drop the `UserRelation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `UserRelation` DROP FOREIGN KEY `UserRelation_userId_fkey`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `UserRelation`;
