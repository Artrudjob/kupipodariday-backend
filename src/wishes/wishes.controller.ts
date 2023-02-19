import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { JwtGuard } from '../auth/jwt.guard';
import { UsersService } from '../users/users.service';
import { RequestUserId } from '../interface/interface';

@Controller('wishes')
export class WishesController {
  constructor(
    private readonly wishesService: WishesService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(
    @Req() req: RequestUserId,
    @Body() createWishDto: CreateWishDto,
  ) {
    const owner = await this.usersService.findOne(req.user.id);
    return this.wishesService.create(createWishDto, owner);
  }

  @Get('/top')
  getTop() {
    return this.wishesService.getTop();
  }

  @Get('/last')
  getLast() {
    return this.wishesService.getLast();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishesService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async updateOne(
    @Req() req: RequestUserId,
    @Param('id') id: string,
    @Body() updateWishDto: UpdateWishDto,
  ) {
    const currentUser = await this.usersService.findOne(req.user.id);
    return this.wishesService.updateOne(+id, updateWishDto, currentUser.id);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async removeOne(@Req() req: RequestUserId, @Param('id') id: string) {
    const currentUser = await this.usersService.findOne(req.user.id);
    return this.wishesService.removeOne(+id, currentUser.id);
  }

  @UseGuards(JwtGuard)
  @Post(':id/copy')
  async copyWish(@Req() req: RequestUserId, @Param('id') wishId: number) {
    const currentUser = await this.usersService.findOne(req.user.id);
    return this.wishesService.copyWish(wishId, currentUser);
  }
}
