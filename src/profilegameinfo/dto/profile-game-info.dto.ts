import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

class WordInfoDto {
  @IsString()
  word: string;

  @IsInt()
  @IsPositive()
  count: number;
}

export class ProfileGameInfoDto {
  @IsInt()
  profileId: number;

  @IsInt()
  gameId: number;

  @IsInt()
  phaseId: number;

  @IsInt()
  @IsPositive()
  completionTime: number;

  @IsInt()
  @IsOptional()
  incorrectWords?: number = 0;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WordInfoDto)
  wordsInfo: WordInfoDto[];
}
