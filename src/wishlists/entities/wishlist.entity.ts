import {
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    JoinColumn,
    OneToMany
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Wish } from '../../wishes/entities/wish.entity';

@Entity()
export class Wishlist {

    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => User)
    @JoinColumn()
    user: User

    @OneToMany(() => Wish, (wish) => wish)
    wishes: Wish[]
}
