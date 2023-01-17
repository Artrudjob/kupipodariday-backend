import {
    Entity,
    ManyToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';
import { Wish } from '../../wishes/entities/wish.entity';
import { Offer } from '../../offers/entities/offer.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Wishlist)
    wishlist: Wishlist

    @OneToOne(() => Offer)
    offer: Offer

    @ManyToMany(() => Wish, (wish) => wish)
    wishes: Wish[]
}
