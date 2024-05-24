import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GameService {
  constructor(private prisma: PrismaService) {}

  async getWordsWithImages(gameId: number, phaseId: number) {
    const words = await this.prisma.word.findMany({
      where: {
        phaseId: phaseId,
        phase: {
          gameId: gameId,
        },
      },
      select: {
        word: true,
        syllables: true,
        size: true,
        image: true,
      },
    });

    console.log(words);

    return words.map((word) => ({
      ...word,
      image: Buffer.from(word.image, 'base64').toString('base64'),
    }));
  }
}
