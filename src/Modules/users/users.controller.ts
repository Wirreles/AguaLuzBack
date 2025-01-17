import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  HttpCode,
  Body,
  Query,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/guards/AuthGuard';
import { UpdateUserDto, UserDto } from '../../dto/users.dto';
import { RolesGuard } from 'src/guards/roles.guards';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from '../../roles/roles.enum';
import { ApiBearerAuth,ApiQuery,ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(200)
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Get()
  @ApiQuery({ name: 'page', description: 'Página a mostrar', required: false })
  @ApiQuery({ name: 'limit', description: 'Límite de resultados por página', required: false})
  getUsers(@Query('limit') limit: string, @Query('page') page: string) {
    if (page && limit) {
      return this.usersService.getUsers(Number(limit), Number(page));
    }
    return this.usersService.getUsers(1, 5);
  }

  @HttpCode(200)
  @Get(':id')
  getUserById(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUserById(id);
  }

  @HttpCode(200)
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Put(':id')
  updateUsers(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: UpdateUserDto,
  ) {
    return this.usersService.updateUsers(id, user);
  }

  @HttpCode(200)
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Delete(':id')
  deleteUsers(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUsers(id);
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Put("admin/:id")
  updateAdmin(@Param('id', ParseUUIDPipe) id: string){
    return this.usersService.updateAdmin(id);
  }
}


