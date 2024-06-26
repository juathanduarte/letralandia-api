import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfileGameInfoDto } from './dto/profile-game-info.dto';

@Injectable()
export class ProfileGameInfoService {
  constructor(private prisma: PrismaService) {}

  async createOrUpdateProfileGameInfo(data: ProfileGameInfoDto) {
    const existingInfo = await this.prisma.profileGameInfo.findFirst({
      where: {
        profileId: data.profileId,
        gameId: data.gameId,
        phaseId: data.phaseId,
      },
    });

    const calculateRating = (
      wordsInfo: { word: string; count: number }[],
    ): number => {
      const totalErrors = wordsInfo.reduce((sum, word) => sum + word.count, 0);
      if (totalErrors <= 0) {
        return 3;
      } else if (totalErrors <= 2) {
        return 2;
      } else {
        return 1;
      }
    };

    const updateProfileGameInfo = async (existingInfo, data) => {
      const updatedWordsInfo = JSON.parse(existingInfo.wordsInfo);

      data.wordsInfo.forEach((newWord) => {
        const existingWord = updatedWordsInfo.find(
          (word) => word.word === newWord.word,
        );
        if (existingWord) {
          existingWord.count += newWord.count;
        } else {
          updatedWordsInfo.push(newWord);
        }
      });

      const rating = calculateRating(data.wordsInfo);

      return this.prisma.profileGameInfo.update({
        where: {
          id: existingInfo.id,
        },
        data: {
          wordsInfo: JSON.stringify(updatedWordsInfo),
          completionTime: existingInfo.completionTime + data.completionTime,
          incorrectWords:
            existingInfo.incorrectWords +
            data.wordsInfo.reduce((sum, word) => sum + word.count, 0),
          rating,
        },
      });
    };

    const createProfileGameInfo = async (data) => {
      const profile = await this.prisma.profile.findUnique({
        where: { id: data.profileId },
      });
      if (!profile) {
        throw new Error(`Profile with ID ${data.profileId} does not exist`);
      }

      const game = await this.prisma.game.findUnique({
        where: { id: data.gameId },
      });
      if (!game) {
        throw new Error(`Game with ID ${data.gameId} does not exist`);
      }

      const phase = await this.prisma.phase.findUnique({
        where: { id: data.phaseId },
      });
      if (!phase) {
        throw new Error(`Phase with ID ${data.phaseId} does not exist`);
      }

      const rating = calculateRating(data.wordsInfo);

      return this.prisma.profileGameInfo.create({
        data: {
          ...data,
          wordsInfo: JSON.stringify(data.wordsInfo),
          incorrectWords: data.wordsInfo.reduce(
            (sum, word) => sum + word.count,
            0,
          ),
          rating,
        },
      });
    };

    if (existingInfo) {
      return updateProfileGameInfo(existingInfo, data);
    } else {
      return createProfileGameInfo(data);
    }
  }

  async getProfileGameInfo(profileId: number, gameId: number) {
    const profileGameInfo = await this.prisma.profileGameInfo.findFirst({
      where: {
        profileId: profileId,
        gameId: gameId,
      },
    });

    if (profileGameInfo) {
      return {
        ...profileGameInfo,
        wordsInfo: JSON.parse(profileGameInfo.wordsInfo),
      };
    } else {
      throw new Error(
        `ProfileGameInfo not found for profileId: ${profileId}, gameId: ${gameId}.`,
      );
    }
  }

  async getAllPhasesForGame(profileId: number, gameId: number) {
    const profileGameInfos = await this.prisma.profileGameInfo.findMany({
      where: {
        profileId: profileId,
        gameId: gameId,
      },
    });

    return profileGameInfos.map((info) => ({
      ...info,
      wordsInfo: JSON.parse(info.wordsInfo),
    }));
  }

  async getProfileGameSummary(profileId: number, gameId: number) {
    const profileGameInfos = await this.prisma.profileGameInfo.findMany({
      where: {
        profileId,
        gameId,
      },
    });

    if (!profileGameInfos || profileGameInfos.length === 0) {
      return {
        hasInformation: false,
        message: `No game data found for profileId: ${profileId}, gameId: ${gameId}`,
      };
    }

    const totalCompletionTime = profileGameInfos.reduce(
      (acc, info) => acc + info.completionTime,
      0,
    );
    const totalPhases = profileGameInfos.length;

    const totalWords = await this.prisma.word.count({
      where: {
        phase: {
          gameId: gameId,
        },
      },
    });

    const errors = profileGameInfos.flatMap((info) =>
      JSON.parse(info.wordsInfo).filter((word) => word.count > 0),
    );

    const errorCount = errors.reduce((acc, error) => {
      acc[error.word] = (acc[error.word] || 0) + error.count;
      return acc;
    }, {});

    return {
      hasInformation: true,
      totalCompletionTime,
      timePerPhase: totalPhases ? totalCompletionTime / totalPhases : 0,
      totalWords,
      errors: errorCount,
    };
  }

  async getAllProfileGamesSummary(profileId: number) {
    const profileGameInfos = await this.prisma.profileGameInfo.findMany({
      where: {
        profileId,
      },
    });

    const games = await this.prisma.game.findMany();

    const gamesSummary = await Promise.all(
      games.map(async (game) => {
        const gameInfos = profileGameInfos.filter(
          (info) => info.gameId === game.id,
        );
        if (gameInfos.length === 0) {
          return {
            gameId: game.id,
            hasInformation: false,
          };
        }

        const totalCompletionTime = gameInfos.reduce(
          (acc, info) => acc + info.completionTime,
          0,
        );
        const totalPhases = gameInfos.length;
        const totalWords = await this.prisma.word.count({
          where: {
            phase: {
              gameId: game.id,
            },
          },
        });

        const errors = gameInfos.flatMap((info) =>
          JSON.parse(info.wordsInfo).filter((word) => word.count > 0),
        );
        const errorCount = errors.reduce((acc, error) => {
          acc[error.word] = (acc[error.word] || 0) + error.count;
          return acc;
        }, {});

        return {
          gameId: game.id,
          hasInformation: true,
          totalCompletionTime,
          timePerPhase: totalPhases ? totalCompletionTime / totalPhases : 0,
          totalWords,
          errors: errorCount,
        };
      }),
    );

    return {
      gamesSummary,
    };
  }
}
