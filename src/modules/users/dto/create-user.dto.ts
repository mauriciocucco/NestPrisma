import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty()
  firstName: string;

  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  password: string;

  @IsOptional()
  @IsEnum(Role)
  @ApiProperty({ required: false })
  role?: Role;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false })
  active?: boolean;
}
