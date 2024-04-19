import { Module } from '@nestjs/common';
import { LampesController } from './lampes.controller';
import { LampesService } from './lampes.service';

@Module({
  imports: [],
  controllers: [LampesController],
  providers: [LampesService],
  exports: [LampesService],
})
export class LampesModule {}
