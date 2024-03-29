import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsUrl,
  Length,
} from 'class-validator';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';
import { Wish } from '../../wishes/entities/wish.entity';
import { Offer } from '../../offers/entities/offer.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @IsDate()
  updatedAt: Date;

  @Column({ unique: true })
  @IsNotEmpty()
  @Length(2, 30)
  username: string;

  @Column({ default: 'Пока ничего не рассказал о себе' })
  @Length(2, 200)
  about: string;

  @Column({ default: 'https://i.pravatar.cc/300' })
  @IsUrl()
  avatar: string;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column()
  @IsNotEmpty()
  password: string;

  @JoinColumn()
  @OneToMany(() => Wish, (wish) => wish.owner)
  @IsArray()
  wishes: Wish[];

  @JoinColumn()
  @OneToMany(() => Offer, (offer) => offer.user)
  @IsArray()
  offers: Offer[];

  @JoinColumn()
  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  @IsArray()
  wishlists: Wishlist[];
}
