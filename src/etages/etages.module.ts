import { Module, forwardRef } from '@nestjs/common';
import { EtagesController } from './etages.controller';
import { EtagesService } from './etages.service';
import { EtagesRepository } from './repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EtageEntity } from './entities';
import { DevicesModule } from '../devices';

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
