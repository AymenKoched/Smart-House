import { forwardRef, Module } from '@nestjs/common';
import { CartesController } from './cartes.controller';
import { CartesService } from './cartes.service';
import { CartesRepository } from './repositories';
import { CarteEntity } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevicesModule } from '../devices';

@Module({
  imports: [
    TypeOrmModule.forFeature([CarteEntity]),
    forwardRef(() => DevicesModule),
  ],
  controllers: [CartesController],
  providers: [CartesService, CartesRepository],
  exports: [CartesService],
})
export class CartesModule {}
