import {
    Entity,
    PrimaryGeneratedColumn,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    Column
} from 'typeorm';
import {
    IsDate,
    IsUrl,
    Length,
    Max
} from 'class-validator';
import { Wish } from '../../wishes/entities/wish.entity';

@Entity()
export class Wishlist {

    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    @IsDate()
    createdAt: Date

    @UpdateDateColumn()
    @IsDate()
    updatedAt: Date

    @Column()
    @Length(1, 250)
    name: string

    @Column()
    @Max(1500)
    description: string

    @Column()
    @IsUrl()
    image: string

    @OneToMany(() => Wish, wish => wish)
    items: Wish[]
}
