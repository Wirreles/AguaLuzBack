// import { Body, Controller, Post } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { ApiTags } from '@nestjs/swagger';
// import Clientes from 'src/entities/clientes.entity';

// @ApiTags('Login/Register')
// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Post('signin')
//   login(@Body() user: Clientes) {
//     return this.authService.login(user);
//   }

//   @Post('signup')
//   register(@Body() user: Clientes) {
//     return this.authService.register(user);
//   }
// }
