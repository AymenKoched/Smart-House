import { Module } from '@nestjs/common';
import { EtagesController } from './etages.controller';
import { EtagesService } from './etages.service';
import { EtagesRepository } from './repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EtageEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([EtageEntity])],
  controllers: [EtagesController],
  providers: [EtagesService, EtagesRepository],
  exports: [EtagesService],
})
export class EtagesModule {}
