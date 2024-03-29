import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { Wish } from '../wishes/entities/wish.entity';
import { IOwner } from '../interface/interface';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
  ) {}

  async create(createWishlistDto: CreateWishlistDto, user: IOwner) {
    const { itemsId } = createWishlistDto;
    const items = itemsId.map((id) => ({ id } as Wish));
    const newWishlist = await this.wishlistRepository.create({
      ...createWishlistDto,
      items,
      owner: user,
    });
    await this.wishlistRepository.save(newWishlist);

    return newWishlist;
  }

  async findOne(id: number) {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id },
      relations: ['owner', 'items'],
    });

    if (wishlist) {
      return wishlist;
    }

    throw new HttpException(
      'Запрашиваемый список желаний не найден.',
      HttpStatus.NOT_FOUND,
    );
  }

  async updateOne(
    id: number,
    userId: number,
    updateWishlistDto: UpdateWishlistDto,
  ) {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id },
      relations: ['owner', 'items'],
    });
    if (wishlist.owner.id !== userId) {
      throw new HttpException(
        'Невозможно обновить чужой список желаний',
        HttpStatus.FORBIDDEN,
      );
    }
    const { itemsId, ...rest } = updateWishlistDto;
    if (wishlist && itemsId) {
      const items = itemsId.map((id) => ({ id } as Wishlist));
      await this.wishlistRepository.save({ id, ...rest, items });
      const updatedWishlist = this.findOne(id);
      return updatedWishlist;
    } else if (wishlist) {
      return this.wishlistRepository.save({ id, ...rest });
    } else {
      throw new BadRequestException('Невозможно обновить');
    }
  }

  async removeOne(id: number, userId: number) {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id },
      relations: ['owner', 'items'],
    });
    if (wishlist.owner.id !== userId) {
      throw new HttpException(
        'Невозможно удалить чужой список желаний',
        HttpStatus.FORBIDDEN,
      );
    }

    const deletedWishlist = await this.wishlistRepository.delete(id);
    if (!deletedWishlist.affected) {
      throw new HttpException(
        'Невозможно удалить. Список желаний не найден.',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
