import { findManyCursorConnection } from '@devoxa/prisma-relay-cursor-connection';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { ConnectionArgsDto } from '../../pagination/dto/connections-args.dto';
import { hash } from 'src/helpers/hash-password';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const password = await hash(createUserDto.password);

    return new UserEntity(
      await this.prisma.user.create({ data: { ...createUserDto, password } }),
    );
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      where: {
        active: true,
      },
    });

    return users.map((user) => new UserEntity(user));
  }

  async paginatedByCursor(connectionArgs: ConnectionArgsDto) {
    const where: Prisma.UserWhereInput = { active: true };

    return await findManyCursorConnection(
      () => this.prisma.user.findMany({ where }),
      () => this.prisma.user.count({ where }),
      connectionArgs,
    );
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findFirst({
      where: { AND: [{ id }, { active: true }] },
    });

    return new UserEntity(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return new UserEntity(
      await this.prisma.user.update({ where: { id }, data: updateUserDto }),
    );
  }

  async remove(id: number) {
    return new UserEntity(await this.prisma.user.delete({ where: { id } }));
  }
}
