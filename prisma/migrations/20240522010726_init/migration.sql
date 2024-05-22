-- CreateTable
CREATE TABLE "FirstGame" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "SecondGame" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "ThirdGame" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateTable
CREATE TABLE "Phase" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gameId" INTEGER,
    "gameType" TEXT NOT NULL,
    "firstGameId" INTEGER,
    "secondGameId" INTEGER,
    "thirdGameId" INTEGER,
    CONSTRAINT "Phase_firstGameId_fkey" FOREIGN KEY ("firstGameId") REFERENCES "FirstGame" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Phase_secondGameId_fkey" FOREIGN KEY ("secondGameId") REFERENCES "SecondGame" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Phase_thirdGameId_fkey" FOREIGN KEY ("thirdGameId") REFERENCES "ThirdGame" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Word" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "word" TEXT NOT NULL,
    "incomplete" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "phaseId" INTEGER NOT NULL,
    CONSTRAINT "Word_phaseId_fkey" FOREIGN KEY ("phaseId") REFERENCES "Phase" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
