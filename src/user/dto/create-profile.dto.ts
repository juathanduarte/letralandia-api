import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(['male', 'female'])
  gender: string;
}
