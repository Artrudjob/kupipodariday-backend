import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('offers')
export class OffersController {
  constructor(
      private readonly offersService: OffersService
              ) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createOfferDto: CreateOfferDto) {
    return this.offersService.create(createOfferDto);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offersService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  updateOne(@Param('id') id: string, @Body() updateOfferDto: UpdateOfferDto) {
    return this.offersService.updateOne(+id, updateOfferDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  removeOne(@Param('id') id: string) {
    return this.offersService.removeOne(+id);
  }
}
