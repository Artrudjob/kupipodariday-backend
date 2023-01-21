import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wish } from './entities/wish.entity';

@Injectable()
export class WishesService {
  constructor(
      @InjectRepository(Wish)
      private wishRepository: Repository<Wish>,
  ) {}

  async create(createWishDto: CreateWishDto) {
    const newWish = await this.wishRepository.create(createWishDto);
    await this.wishRepository.save(newWish);

    return newWish;
  }

  async findOne(id: number): Promise<Wish> {
    const wish = await this.wishRepository.findOneBy({ id: id });
    if (wish) {
      return wish;
    }

    throw new HttpException('Запрашиваемый подарок не найден.', HttpStatus.NOT_FOUND);
  }

  async updateOne(id: number, updateWishDto: UpdateWishDto) {
    await this.wishRepository.update(id, updateWishDto);
    const updatedWish = await this.wishRepository.findOneBy({ id: id });
    if (updatedWish) {
      return updatedWish;
    }

    throw new HttpException('Невозможно обновить. Запрашиваемый подарок не найден.', HttpStatus.NOT_FOUND);
  }

  async removeOne(id: number) {
    const deletedWish = await this.wishRepository.delete(id);
    if (!deletedWish.affected) {
      throw new HttpException('Невозможно удалить. Подарок не найден.', HttpStatus.NOT_FOUND);
    }
  }
}
