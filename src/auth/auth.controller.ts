import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public.decorator';
import { JwtAuthGuard } from './guards/jwt.auth-guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: AuthRequest) {
    try {
      const user = await this.authService.validateUser(
        req.body.email,
        req.body.password,
      );
      return this.authService.login(user);
    } catch (error) {
      if (error.message === 'E-mail não encontrado.') {
        throw new HttpException(
          'E-mail não encontrado.',
          HttpStatus.BAD_REQUEST,
        );
      } else if (error.message === 'Senha incorreta.') {
        throw new HttpException('Senha incorreta.', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(
          'Erro de autenticação.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @IsPublic()
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Request() req: any) {
    return { userId: req.user.userId };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  logout(@Request() req: any) {
    const token = req.headers.authorization.split(' ')[1];
    this.authService.logout(token);
    return { message: 'Logout successful' };
  }
}
