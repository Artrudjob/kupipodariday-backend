import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.userRepository.create(createUserDto);
    const { password, ...res } = newUser;
    const hash = await bcrypt.hash(password, 10);

    await this.userRepository.save({ password: hash, ...res });

    return newUser;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id: id });
    if (user) {
      return user;
    }

    throw new HttpException('Запрашиваемый пользователь не найден.', HttpStatus.NOT_FOUND);
  }

  async findByUsername(username: string) {
    const user = await this.userRepository.findOneBy({ username: username })
    if (user) {
      return user;
    }

    throw new HttpException('Запрашиваемый пользователь не найден.', HttpStatus.NOT_FOUND);
  }

  async updateOne(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);

    const updatedUser = await this.userRepository.findOneBy({ id: id });
    if (updatedUser) {
      return updatedUser;
    }

    throw new HttpException('Невозможно обновить. Пользователь не найден.', HttpStatus.NOT_FOUND);
  }

  async removeOne(id: number) {
    const deletedUser = await this.userRepository.delete(id);
    if (!deletedUser.affected) {
      throw new HttpException('Невозможно удалить. Пользователь не найден.', HttpStatus.NOT_FOUND);
    }
  }
}
