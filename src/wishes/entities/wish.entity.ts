import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    JoinColumn
} from 'typeorm';
import {
    IsArray,
    IsDate,
    IsInt,
    IsPositive,
    IsUrl,
    Length
} from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Offer } from '../../offers/entities/offer.entity';

@Entity({ schema: 'nest_project' })
export class Wish {

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
    @IsUrl()
    link: string

    @Column()
    @IsUrl()
    image: string

    @Column()
    @IsPositive()
    price: number

    @Column()
    @IsPositive()
    raised: number

    @JoinColumn()
    @ManyToOne(() => User, (user) => user)
    owner: User

    @Column()
    @Length(1, 1024)
    description: string

    @JoinColumn()
    @OneToMany(() => Offer, (offer) => offer)
    @IsArray()
    offers: Offer[]

    @Column("integer")
    @IsInt()
    copied: number
}
