import { Module } from '@nestjs/common';
import { CartesController } from './cartes.controller';
import { CartesService } from './cates.service';
import { CartesRepository } from './repositories';
import { CarteEntity } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CarteEntity])],
  controllers: [CartesController],
  providers: [CartesService, CartesRepository],
  exports: [CartesService],
})
export class CartesModule {}
