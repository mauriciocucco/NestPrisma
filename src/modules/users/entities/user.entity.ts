import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Role, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @Exclude()
  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ required: false, default: Role.USER })
  role: Role;

  @ApiProperty({ required: false, default: true })
  active: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}

export class FilteredUser extends OmitType(UserEntity, ['password'] as const) {}
