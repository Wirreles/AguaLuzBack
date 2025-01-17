import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from '../../dto/auth.dto';
import { UserDto } from 'src/dto/users.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Login/Register')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  login(@Body() user: AuthDto) {
    return this.authService.login(user);
  }

  @Post('signup')
  register(@Body() user: UserDto) {
    return this.authService.register(user);
  }
}
