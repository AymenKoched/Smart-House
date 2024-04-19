import { Module } from '@nestjs/common';
import { EtagesController } from './etages.controller';
import { EtagesService } from './etages.service';

@Module({
  imports: [],
  controllers: [EtagesController],
  providers: [EtagesService],
  exports: [EtagesService],
})
export class EtagesModule {}
