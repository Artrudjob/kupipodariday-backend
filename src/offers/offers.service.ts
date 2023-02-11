import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Offer } from './entities/offer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WishesService } from '../wishes/wishes.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    private wishesService: WishesService,
  ) {}

  async create(createOfferDto: CreateOfferDto, user: User): Promise<Offer> {
    const { itemId, amount } = createOfferDto;
    const wish = await this.wishesService.findOne(itemId);

    if (wish.owner.id === user.id) {
      throw new HttpException(
        'Вы не можете создавать предложения для своих подарков.',
        HttpStatus.FORBIDDEN,
      );
    } else if (wish.price < wish.raised + amount) {
      throw new HttpException(
        'Сумма собранных средств не может превышать стоимость подарка.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newOffer = await this.offerRepository.create({
      ...createOfferDto,
      user,
    });
    newOffer.item = await this.wishesService.findOne(createOfferDto.itemId);
    await this.offerRepository.save(newOffer);
    await this.wishesService.UpdateRaised(wish, amount);

    return newOffer;
  }

  async findOne(id: number) {
    const offer = await this.offerRepository.findOneBy({ id: id });
    if (offer) {
      return offer;
    }

    throw new HttpException('Предложение не найдено.', HttpStatus.NOT_FOUND);
  }

  async updateOne(id: number, updateOfferDto: UpdateOfferDto) {
    await this.offerRepository.update(id, updateOfferDto);

    const updatedOffer = await this.offerRepository.findOneBy({ id: id });
    if (updatedOffer) {
      return updatedOffer;
    }

    throw new HttpException(
      'Невозможно обновить. Предложение не найдено.',
      HttpStatus.NOT_FOUND,
    );
  }

  async removeOne(id: number) {
    const deletedOffer = await this.offerRepository.delete(id);
    if (!deletedOffer.affected) {
      throw new HttpException(
        'Невозможно удалить. Предложение не найдено.',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
