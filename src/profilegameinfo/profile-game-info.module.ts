import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProfileGameInfoController } from './profile-game-info.controller';
import { ProfileGameInfoService } from './profile-game-info.service';

@Module({
  controllers: [ProfileGameInfoController],
  providers: [ProfileGameInfoService, PrismaService],
})
export class ProfileGameInfoModule {}
