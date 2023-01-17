import {
    Entity,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';
import { User } from '../../users/entities/user.entity';
import { JoinTable } from 'typeorm/browser';
import { Offer } from "../../offers/entities/offer.entity";

@Entity()
export class Wish {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Wishlist, (wishlist) => wishlist)
    wishlist: Wishlist

    @ManyToOne(() => Offer, (offer) =>offer)
    offer: Offer

    @ManyToMany(() => User, (user) => user)
    @JoinTable()
    users: User[]
}
