import { Module } from '@nestjs/common';
import { LampesController } from './lampes.controller';
import { LampesService } from './lampes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LampeEntity } from './entities';
import { LampesRepository } from './repositories';

@Module({
  imports: [TypeOrmModule.forFeature([LampeEntity])],
  controllers: [LampesController],
  providers: [LampesService, LampesRepository],
  exports: [LampesService],
})
export class LampesModule {}
