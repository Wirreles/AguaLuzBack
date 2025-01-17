import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import User from '../../entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from '../../dto/users.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUsers(
    page: number,
    limit: number,
  ): Promise<Omit<User, 'isAdmin' | 'password'>[]> {
      const start = (page - 1) * limit;
      const end = start + limit;
      const users: User[] = await this.userRepository.find();
      if (users.length === 0)
        throw new BadRequestException('No hay usuarios registrados');
      const usersList = users.slice(start, end);
      return usersList.map(
        ({ password, isAdmin, ...userNoPassword }) => userNoPassword,
      );
  }

  async deleteUsers(id: string): Promise<Object> {
      const user: User = await this.userRepository.findOneBy({ id });
      if(user.isAdmin==="admin") throw new NotFoundException("No se puede eliminar un administrador")
      if (!user)
        throw new BadRequestException(`El usuario con id: ${id} no existe`);
      await this.userRepository.delete(id);
      return { message: 'El usuario ha sido eliminado' };
    }

  async updateUsers(id: string, user: UpdateUserDto): Promise<Object> {
      const usuario: User = await this.userRepository.findOneBy({ id });
      if (!usuario)
        throw new BadRequestException(`El usuario con id: ${id} no existe`);
      await this.userRepository.update(id, user);
      return { message: 'Usuario Actualizado Correctamente' };
    }
  

  async getUserById(id: string): Promise<Omit<User, 'password' | 'isAdmin'>> {
      const users = await this.userRepository.findOne({
        where: { id },
        relations: {
          orders_id: true,
        },
      });
      if (!users)
        throw new BadRequestException(`El usuario con id: ${id} no existe`);
      const { password, isAdmin, ...userSincontra } = users;
      return userSincontra;
  }

  async updateAdmin(id: string): Promise<Object> {
      const user: User = await this.userRepository.findOneBy({ id });
      if (!user)
        throw new BadRequestException(`El usuario con id: ${id} no existe`);
      if (user.isAdmin === 'admin') {
        throw new BadRequestException('El usuario ya es un admin');
      } else {
        user.isAdmin = 'admin';
        await this.userRepository.save(user);
        return { message: `El usuario ${user.name} ahora, es admin!` };
      }
  }
}
