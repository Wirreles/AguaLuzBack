import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/AuthGuard';
import { RolesGuard } from 'src/guards/roles.guards';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/roles.enum';
import { SeederService } from './seeder.services';

@ApiTags('Precargas')
@Controller('seeder')
export class SeederController {
  constructor(private readonly seederServices: SeederService) {}

  @ApiBearerAuth()
  @HttpCode(200)
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('products')
  addProductSeeder() {
    return this.seederServices.addProductSeeder();
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('category')
  addCategoriesSeeder() {
    return this.seederServices.addCategoriesSeeder();
  }
  
  @ApiBearerAuth()
  @HttpCode(200)
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('User')
  addUserSeeder() {
    return this.seederServices.addUserSeeder();
  }
}
