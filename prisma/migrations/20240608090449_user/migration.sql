/*
  Warnings:

  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `jobs` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `techStack` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `createdAt`,
    DROP COLUMN `jobs`,
    DROP COLUMN `techStack`,
    DROP COLUMN `username`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `UserRelation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `type` ENUM('LIKE', 'HATE') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserRelation` ADD CONSTRAINT `UserRelation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
