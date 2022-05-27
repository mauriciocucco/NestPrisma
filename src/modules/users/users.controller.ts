import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FilteredUser } from './entities/user.entity';
import { ConnectionArgsDto } from '../../pagination/dto/connections-args.dto';
import { ApiPageResponse } from 'src/pagination/decorators/api-page-response.decorator';
import { PageDto } from 'src/pagination/dto/page.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
@ApiTags('users')
@ApiExtraModels(PageDto)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(JwtAuthGuard) // 🔐
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: FilteredUser })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({ type: [FilteredUser] })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('paginatedByCursor')
  @ApiPageResponse(FilteredUser)
  findAllPaginatedByCursor(@Query() connectionArgs: ConnectionArgsDto) {
    return this.usersService.paginatedByCursor(connectionArgs);
  }

  @Get(':id')
  @ApiOkResponse({ type: FilteredUser })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard) // 🔐
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: FilteredUser })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard) // 🔐
  @ApiBearerAuth()
  @ApiOkResponse({ type: FilteredUser })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
