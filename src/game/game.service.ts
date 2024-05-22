import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWordDto } from './dto/create-word.dto';

@Injectable()
export class GameService {
  constructor(private prisma: PrismaService) {}

  async addWordsToPhase(createWordDtos: CreateWordDto[]) {
    const words = await this.prisma.word.createMany({
      data: createWordDtos,
    });
    return words;
  }

  async findAll() {
    return this.prisma.word.findMany({
      include: { phase: true },
    });
  }

  async findOne(id: number) {
    return this.prisma.word.findUnique({
      where: { id },
      include: { phase: true },
    });
  }

  async findWordsByPhase(phaseId: number) {
    return this.prisma.word.findMany({
      where: { phaseId },
      include: { phase: true },
    });
  }
}
