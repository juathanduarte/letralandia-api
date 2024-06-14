-- CreateTable
CREATE TABLE "ProfileGameInfo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "profileId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "phaseId" INTEGER NOT NULL,
    "wordsInfo" TEXT NOT NULL,
    "completionTime" INTEGER NOT NULL,
    "correctWords" INTEGER NOT NULL,
    "incorrectWords" INTEGER NOT NULL,
    CONSTRAINT "ProfileGameInfo_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProfileGameInfo_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProfileGameInfo_phaseId_fkey" FOREIGN KEY ("phaseId") REFERENCES "Phase" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
