import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { ProfileGameInfoDto } from './dto/profile-game-info.dto';
import { ProfileGameInfoService } from './profile-game-info.service';

@Controller('profile-game-info')
export class ProfileGameInfoController {
  constructor(
    private readonly profileGameInfoService: ProfileGameInfoService,
  ) {}

  @IsPublic()
  @Post()
  createOrUpdateProfileGameInfo(@Body() data: ProfileGameInfoDto) {
    return this.profileGameInfoService.createOrUpdateProfileGameInfo(data);
  }

  @IsPublic()
  @Get(':profileId/:gameId/phases')
  getAllPhasesForGame(
    @Param('profileId') profileId: number,
    @Param('gameId') gameId: number,
  ) {
    return this.profileGameInfoService.getAllPhasesForGame(profileId, gameId);
  }
}
