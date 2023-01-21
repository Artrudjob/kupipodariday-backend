import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import {Offer} from "./entities/offer.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Wish} from "../wishes/entities/wish.entity";
import {WishesService} from "../wishes/wishes.service";

@Injectable()
export class OffersService {
  constructor(
      @InjectRepository(Offer)
      private offerRepository: Repository<Offer>,
      private wishesService: WishesService
  ) {}

  async create(createOfferDto: CreateOfferDto): Promise<Offer> {
    const newOffer = await this.offerRepository.create(createOfferDto);
    newOffer.item = await this.wishesService.findOne(createOfferDto.itemId);
    await this.offerRepository.save(newOffer);

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

    throw new HttpException('Невозможно обновить. Предложение не найдено.', HttpStatus.NOT_FOUND);
  }

  async removeOne(id: number) {
    const deletedOffer = await this.offerRepository.delete(id);
    if (!deletedOffer.affected) {
      throw new HttpException('Невозможно удалить. Предложение не найдено.', HttpStatus.NOT_FOUND);
    }
  }
}
