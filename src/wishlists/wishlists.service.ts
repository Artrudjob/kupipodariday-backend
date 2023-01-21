import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';

@Injectable()
export class WishlistsService {
  constructor(
      @InjectRepository(Wishlist)
      private wishlistRepository: Repository<Wishlist>,
  ) {}

  async create(createWishlistDto: CreateWishlistDto) {
    const newWishlist = await this.wishlistRepository.create(createWishlistDto);
    await this.wishlistRepository.save(newWishlist);

    return newWishlist;
  }

  async findOne(id: number) {
    const wishlist = await this.wishlistRepository.findOneBy({ id: id });
    if (wishlist) {
      return wishlist;
    }

    throw new HttpException('Запрашиваемый список желаний не найден.', HttpStatus.NOT_FOUND);
  }

  async updateOne(id: number, updateWishlistDto: UpdateWishlistDto) {
    await this.wishlistRepository.update(id, updateWishlistDto);

    const updatedWishlist = await this.wishlistRepository.findOneBy({ id: id });
    if (updatedWishlist) {
      return updatedWishlist;
    }

    throw new HttpException('Невозможно обновить. Список желаний не найден.', HttpStatus.NOT_FOUND);
  }

  async removeOne(id: number) {
    const deletedWishlist = await this.wishlistRepository.delete(id);
    if (!deletedWishlist.affected) {
      throw new HttpException('Невозможно удалить. Список желаний не найден.', HttpStatus.NOT_FOUND);
    }
  }
}
