import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const createdUser = await this.prisma.user.create({ data });

    return {
      ...createdUser,
      password: undefined,
    };
  }

  async createProfile(userId: number, createProfileDto: CreateProfileDto) {
    const profile = await this.prisma.profile.create({
      data: {
        ...createProfileDto,
        userId,
      },
    });

    return profile;
  }

  async findAllProfiles(userId: number) {
    return this.prisma.profile.findMany({
      where: { userId },
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findProfileDetails(userId: number, profileId: number) {
    return this.prisma.profile.findFirst({
      where: {
        id: profileId,
        userId: userId,
      },
      include: {
        user: true, // Isso incluirá os detalhes do usuário associado ao perfil
      },
    });
  }

  async deleteProfile(userId: number, profileId: number) {
    const profile = await this.prisma.profile.findFirst({
      where: {
        id: profileId,
        userId: userId,
      },
    });

    if (!profile) {
      throw new Error('Profile not found or does not belong to the user');
    }

    return this.prisma.profile.delete({
      where: {
        id: profileId,
      },
    });
  }
}
