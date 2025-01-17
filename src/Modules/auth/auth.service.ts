import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { UserDto } from 'src/dto/users.dto';
import { Repository } from 'typeorm';
import User from 'src/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDto } from '../../dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: AuthDto) {
      const { password, email }: AuthDto = user;
      const dbUser: User = await this.userRepository.findOne({
        where: { email },
      });
      if (!dbUser) {
        throw new BadRequestException('Usuario o Password Incorrectos');
      }
      const isPasswordValid = await bcrypt.compare(password, dbUser.password);
      if (!isPasswordValid) {
        throw new BadRequestException('Usuario o Password Incorrectos');
      }

      const userPayload = {
        sub: dbUser.id,
        id: dbUser.id,
        email: dbUser.email,
        roles: dbUser.isAdmin,
      };

      const token: string = this.jwtService.sign(userPayload);
      return { success: 'Logeado Exitosamente', token };
  }

  async register(user: UserDto) {
      const users: User = await this.userRepository.findOne({
        where: { email: user.email },
      });
      if (users) {
        throw new ConflictException('El usuario ya existe');
      }
      if (user.password !== user.confirmPassword) {
        throw new BadRequestException('Las contraseñas no coinciden');
      } else {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        if (!hashedPassword) {
          throw new BadRequestException('La password no se pudo Hashear');
        }
        await this.userRepository.save({ ...user, password: hashedPassword });
        
        return 'Usuario Registrado';
      }
  }
}
