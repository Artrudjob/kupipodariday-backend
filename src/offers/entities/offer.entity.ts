import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Wish } from '../../wishes/entities/wish.entity';
import { IsBoolean, IsDate, IsPositive } from 'class-validator';

@Entity('nest_project')
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  @IsDate()
  updatedAt: Date;

  @JoinColumn()
  @OneToOne(() => User, (user) => user.id)
  user: User;

  @JoinColumn()
  @OneToOne(() => Wish, (wish) => wish.id)
  item: Wish;

  @Column()
  @IsPositive()
  amount: number;

  @Column({ default: false })
  @IsBoolean()
  hidden: boolean;
}
