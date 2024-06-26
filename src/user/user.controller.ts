import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CreateProfileDto } from './dto/create-profile.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
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

  @IsPublic()
  @Get(':userId/profile/:profileId')
  async getProfileDetails(
    @Param('userId') userId: number,
    @Param('profileId') profileId: number,
  ) {
    return this.userService.findProfileDetails(userId, profileId);
  }

  @IsPublic()
  @Delete(':userId/profile/:profileId')
  deleteProfile(
    @Param('userId') userId: number,
    @Param('profileId') profileId: number,
  ) {
    return this.userService.deleteProfile(userId, profileId);
  }

  @IsPublic()
  @Put(':userId/profile/:profileId')
  updateProfile(
    @Param('userId') userId: number,
    @Param('profileId') profileId: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.userService.updateProfile(userId, profileId, updateProfileDto);
  }
}
