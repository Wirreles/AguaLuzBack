import { PickType } from '@nestjs/swagger';
import { UserDto } from 'src/dto/users.dto';

export class AuthDto extends PickType(UserDto, ['password', 'email']) {}
