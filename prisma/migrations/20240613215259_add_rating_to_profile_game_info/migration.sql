/*
  Warnings:

  - You are about to drop the column `correctWords` on the `ProfileGameInfo` table. All the data in the column will be lost.
  - Added the required column `rating` to the `ProfileGameInfo` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProfileGameInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "profileId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "phaseId" INTEGER NOT NULL,
    "wordsInfo" TEXT NOT NULL,
    "completionTime" INTEGER NOT NULL,
    "incorrectWords" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    CONSTRAINT "ProfileGameInfo_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProfileGameInfo_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProfileGameInfo_phaseId_fkey" FOREIGN KEY ("phaseId") REFERENCES "Phase" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProfileGameInfo" ("completionTime", "gameId", "id", "incorrectWords", "phaseId", "profileId", "wordsInfo") SELECT "completionTime", "gameId", "id", "incorrectWords", "phaseId", "profileId", "wordsInfo" FROM "ProfileGameInfo";
DROP TABLE "ProfileGameInfo";
ALTER TABLE "new_ProfileGameInfo" RENAME TO "ProfileGameInfo";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
