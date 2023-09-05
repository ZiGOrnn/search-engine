import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchEntity } from './entities/search.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5400,
      username: 'postgres',
      password: 'mysecretpassword',
      database: 'search_engine',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([SearchEntity]),
  ],
})
export class DatabaseModule {}
