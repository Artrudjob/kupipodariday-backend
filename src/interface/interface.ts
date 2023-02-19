import { Request } from '@nestjs/common';
import { Wish } from '../wishes/entities/wish.entity';
import { Offer } from '../offers/entities/offer.entity';
import { Wishlist } from '../wishlists/entities/wishlist.entity';

export interface RequestUserId extends Request {
  user: {
    id: number;
  };
}

export interface IOwner {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  about: string;
  avatar: string;
  email: string;
  wishes: Wish[];
  offers: Offer[];
  wishlists: Wishlist[];
}
