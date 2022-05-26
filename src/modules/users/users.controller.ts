import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FilteredUser, UserEntity } from './entities/user.entity';
import { ConnectionArgsDto } from '../../paginated/dto/connections-args.dto';
import { ApiPageResponse } from 'src/paginated/decorators/api-page-response.decorator';
import { PageDto } from 'src/paginated/dto/page.dto';

@Controller('users')
@ApiTags('users')
@ApiExtraModels(PageDto)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({ type: [FilteredUser] })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('paginatedByCursor')
  @ApiPageResponse(UserEntity)
  findAllPaginatedByCursor(@Query() connectionArgs: ConnectionArgsDto) {
    return this.usersService.paginatedByCursor(connectionArgs);
  }

  @Get(':id')
  @ApiOkResponse({ type: FilteredUser })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: UserEntity })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserEntity })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
