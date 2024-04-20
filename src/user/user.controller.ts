import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CreateProfileDto } from './dto/create-profile.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @IsPublic()
  @Post(':userId/profile')
  createProfile(
    @Param('userId') userId: number,
    @Body() createProfileDto: CreateProfileDto,
  ) {
    return this.userService.createProfile(userId, createProfileDto);
  }

  @IsPublic()
  @Get(':userId/profiles')
  findAllProfiles(@Param('userId') userId: number) {
    return this.userService.findAllProfiles(userId);
  }

  @Get()
  findByEmail(@Body() email: string) {
    return this.userService.findByEmail(email);
  }
}
