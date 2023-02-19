import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wish } from './entities/wish.entity';
import { IOwner } from '../interface/interface';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
  ) {}

  async create(createWishDto: CreateWishDto, owner: IOwner) {
    const newWish = await this.wishRepository.create(createWishDto);
    await this.wishRepository.save({ ...createWishDto, owner });

    return newWish;
  }

  async findOne(id: number): Promise<Wish> {
    const wish = await this.wishRepository.findOneBy({ id });
    if (wish) {
      return wish;
    }

    throw new HttpException(
      'Запрашиваемый подарок не найден.',
      HttpStatus.NOT_FOUND,
    );
  }

  async updateOne(id: number, updateWishDto: UpdateWishDto, userId: number) {
    const wish = await this.wishRepository.findOneBy({ id });
    if (!wish) {
      throw new HttpException(
        'Невозможно обновить. Запрашиваемый подарок не найден.',
        HttpStatus.NOT_FOUND,
      );
    }

    if (wish.owner.id !== userId) {
      throw new HttpException(
        'Невозможно обновить чужой подарок.',
        HttpStatus.FORBIDDEN,
      );
    }

    if (wish.offers.length > 0) {
      const price = wish.price;
      return await this.wishRepository.update(id, {
        ...updateWishDto,
        price: price,
      });
    } else {
      return await this.wishRepository.update(id, updateWishDto);
    }
  }

  async UpdateRaised(wish: Wish, amount: number) {
    return this.wishRepository.update(
      { id: wish.id },
      { raised: wish.raised + amount },
    );
  }

  async removeOne(id: number, userId: number) {
    const wish = await this.wishRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
    if (wish.owner.id !== userId) {
      throw new HttpException(
        'Невозможно удалить чужой подарок.',
        HttpStatus.FORBIDDEN,
      );
    }

    const deletedWish = await this.wishRepository.delete(id);
    if (!deletedWish.affected) {
      throw new HttpException(
        'Невозможно удалить. Подарок не найден.',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  getTop() {
    return this.wishRepository.find({
      where: {},
      order: { copied: 'DESC' },
      take: 20,
    });
  }

  getLast() {
    return this.wishRepository.find({
      where: {},
      order: { createdAt: 'DESC' },
      take: 40,
    });
  }

  async copyWish(id: number, user: IOwner) {
    const wish = await this.wishRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
    if (wish.owner.id === user.id) {
      throw new HttpException(
        'Невозможно скопировать собственный подарок',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newWish = await this.create({ ...wish }, user);
    await this.wishRepository.update({ id }, { copied: wish.copied + 1 });
    return newWish;
  }
}
