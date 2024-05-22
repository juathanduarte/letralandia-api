import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CreateWordDto } from './dto/create-word.dto';
import { GameService } from './game.service';

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @IsPublic()
  @Post('words')
  addWords(@Body() createWordDtos: CreateWordDto[]) {
    return this.gameService.addWordsToPhase(createWordDtos);
  }

  @IsPublic()
  @Get('words')
  findAll() {
    return this.gameService.findAll();
  }

  @IsPublic()
  @Get('words/:id')
  findOne(@Param('id') id: string) {
    return this.gameService.findOne(+id);
  }

  @IsPublic()
  @Get('phase/:phaseId/words')
  findWordsByPhase(@Param('phaseId') phaseId: string) {
    return this.gameService.findWordsByPhase(+phaseId);
  }
}
