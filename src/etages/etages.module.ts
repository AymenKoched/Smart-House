import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DevicesModule } from '../devices';

import { EtagesController } from './etages.controller';
import { EtagesService } from './etages.service';
import { EtagesRepository } from './repositories';
import { EtageEntity } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([EtageEntity]),
    forwardRef(() => DevicesModule),
  ],
  controllers: [EtagesController],
  providers: [EtagesService, EtagesRepository],
  exports: [EtagesService],
})
export class EtagesModule {}
