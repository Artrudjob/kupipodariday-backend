import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { WishesModule } from './wishes/wishes.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { OffersModule } from './offers/offers.module';

@Module({
  imports: [
      ConfigModule.forRoot({
        envFilePath: '.env'
      }),
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'student',
        password: 'student',
        database: 'nest_project',
        entities: [],
        synchronize: true,
      }),
      UsersModule,
      WishesModule,
      WishlistsModule,
      OffersModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
