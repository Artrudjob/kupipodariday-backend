import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  JoinColumn,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { IsDate, IsUrl, Length } from 'class-validator';
import { Wish } from '../../wishes/entities/wish.entity';
import { User } from '../../users/entities/user.entity';

@Entity('wishlists')
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @IsDate()
  updatedAt: Date;

  @Column()
  @Length(1, 250)
  name: string;

  @Column()
  @IsUrl()
  image: string;

  @JoinTable()
  @ManyToMany(() => Wish, (wish) => wish.id)
  items: Wish[];

  @JoinColumn()
  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User;
}
