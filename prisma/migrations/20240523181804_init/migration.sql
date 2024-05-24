/*
  Warnings:

  - You are about to drop the `FirstGame` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SecondGame` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ThirdGame` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `firstGameId` on the `Phase` table. All the data in the column will be lost.
  - You are about to drop the column `gameType` on the `Phase` table. All the data in the column will be lost.
  - You are about to drop the column `secondGameId` on the `Phase` table. All the data in the column will be lost.
  - You are about to drop the column `thirdGameId` on the `Phase` table. All the data in the column will be lost.
  - Made the column `gameId` on table `Phase` required. This step will fail if there are existing NULL values in that column.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "FirstGame";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "SecondGame";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ThirdGame";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Phase" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gameId" INTEGER NOT NULL,
    CONSTRAINT "Phase_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Phase" ("gameId", "id") SELECT "gameId", "id" FROM "Phase";
DROP TABLE "Phase";
ALTER TABLE "new_Phase" RENAME TO "Phase";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
