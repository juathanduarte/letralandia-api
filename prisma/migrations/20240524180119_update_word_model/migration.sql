/*
  Warnings:

  - You are about to drop the column `emoji` on the `Word` table. All the data in the column will be lost.
  - You are about to drop the column `incomplete` on the `Word` table. All the data in the column will be lost.
  - Added the required column `image` to the `Word` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Word` table without a default value. This is not possible if the table is not empty.
  - Added the required column `syllables` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Word" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "word" TEXT NOT NULL,
    "syllables" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "phaseId" INTEGER NOT NULL,
    CONSTRAINT "Word_phaseId_fkey" FOREIGN KEY ("phaseId") REFERENCES "Phase" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Word" ("id", "phaseId", "word") SELECT "id", "phaseId", "word" FROM "Word";
DROP TABLE "Word";
ALTER TABLE "new_Word" RENAME TO "Word";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
