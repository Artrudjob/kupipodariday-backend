import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import {JwtGuard} from "../auth/jwt.guard";

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createWishDto: CreateWishDto) {
    return this.wishesService.create(createWishDto);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishesService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  updateOne(@Param('id') id: string, @Body() updateWishDto: UpdateWishDto) {
    return this.wishesService.updateOne(+id, updateWishDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  removeOne(@Param('id') id: string) {
    return this.wishesService.removeOne(+id);
  }
}
