import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new BadRequestException('E-mail já cadastrado.');
    }

    const isPasswordValid = this.validatePassword(createUserDto.password);
    if (!isPasswordValid) {
      throw new BadRequestException(
        'Senha inválida. A senha deve conter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.',
      );
    }

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

  validatePassword(password: string): boolean {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}$/;
    return re.test(password);
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
        user: true,
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
      throw new NotFoundException(
        'Profile not found or does not belong to the user',
      );
    }

    await this.prisma.profileGameInfo.deleteMany({
      where: {
        profileId: profileId,
      },
    });

    return this.prisma.profile.delete({
      where: {
        id: profileId,
      },
    });
  }

  async updateProfile(
    userId: number,
    profileId: number,
    updateProfileDto: UpdateProfileDto,
  ) {
    const profile = await this.prisma.profile.findFirst({
      where: { id: profileId, userId },
    });

    if (!profile) {
      throw new NotFoundException(
        'Profile not found or does not belong to the user',
      );
    }

    return this.prisma.profile.update({
      where: { id: profileId },
      data: updateProfileDto,
    });
  }
}
