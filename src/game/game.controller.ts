import { Controller, Get, Param } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { GameService } from './game.service';

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @IsPublic()
  @Get(':gameId/phases/:phaseId/words')
  async getWordsWithImages(
    @Param('gameId') gameId: number,
    @Param('phaseId') phaseId: number,
  ) {
    return this.gameService.getWordsWithImages(gameId, phaseId);
  }

  @IsPublic()
  @Get(':gameId/phases')
  async getPhases(@Param('gameId') gameId: number) {
    return this.gameService.getPhases(gameId);
  }
}
