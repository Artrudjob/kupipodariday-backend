import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn, OneToOne
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Wish } from '../../wishes/entities/wish.entity';
import {
    IsBoolean,
    IsDate,
    IsPositive
} from 'class-validator';

@Entity()
export class Offer {

    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    @IsDate()
    createdAt: Date

    @UpdateDateColumn()
    @IsDate()
    updatedAt: Date

    @OneToOne(() => User, user => user.id)
    user: User

    @OneToOne(() => Wish, wish => wish)
    item: Wish

    @Column()
    @IsPositive()
    amount: number

    @Column({ default: false })
    @IsBoolean()
    hidden: boolean
}
