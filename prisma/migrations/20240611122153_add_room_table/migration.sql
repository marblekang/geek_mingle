-- CreateTable
CREATE TABLE `Room` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `accepted` BOOLEAN NOT NULL DEFAULT false,
    `senderEmail` VARCHAR(191) NOT NULL,
    `receiverEmail` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_senderEmail_fkey` FOREIGN KEY (`senderEmail`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_receiverEmail_fkey` FOREIGN KEY (`receiverEmail`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
