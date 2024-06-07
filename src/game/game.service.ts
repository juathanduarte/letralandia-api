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
        audioMale: true, // Incluindo a coluna de áudio masculino
        audioFemale: true, // Incluindo a coluna de áudio feminino
      },
    });

    console.log(words);

    return words.map((word) => ({
      ...word,
      image: Buffer.from(word.image, 'base64').toString('base64'),
      audioMale: word.audioMale
        ? Buffer.from(word.audioMale, 'base64').toString('base64')
        : null,
      audioFemale: word.audioFemale
        ? Buffer.from(word.audioFemale, 'base64').toString('base64')
        : null,
    }));
  }

  async getPhases(gameId: number) {
    const phases = await this.prisma.phase.findMany({
      where: {
        gameId: gameId,
      },
      select: {
        id: true,
      },
    });

    return phases.map((phase, index) => ({
      id: phase.id,
      name: `${index + 1}º nível`,
    }));
  }
}
