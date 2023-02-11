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
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { JwtGuard } from '../auth/jwt.guard';
import { RequestUserId } from '../interface/interface';
import { UsersService } from '../users/users.service';

@Controller('wishlists')
export class WishlistsController {
  constructor(
    private readonly wishlistsService: WishlistsService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(
    @Req() req: RequestUserId,
    @Body() createWishlistDto: CreateWishlistDto,
  ) {
    const user = await this.usersService.findOne(req.user.id);
    return this.wishlistsService.create(createWishlistDto, user);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishlistsService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async updateOne(
    @Req() req: RequestUserId,
    @Param('id') id: string,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ) {
    const currentUser = await this.usersService.findOne(req.user.id);
    return this.wishlistsService.updateOne(
      +id,
      currentUser.id,
      updateWishlistDto,
    );
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async removeOne(@Req() req: RequestUserId, @Param('id') id: string) {
    const currentUser = await this.usersService.findOne(req.user.id);
    return this.wishlistsService.removeOne(+id, currentUser.id);
  }
}
