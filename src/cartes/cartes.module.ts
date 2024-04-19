import { Module } from '@nestjs/common';
import { CartesController } from './cartes.controller';
import { CartesService } from './cates.service';

@Module({
  imports: [],
  controllers: [CartesController],
  providers: [CartesService],
  exports: [CartesService],
})
export class CartesModule {}
