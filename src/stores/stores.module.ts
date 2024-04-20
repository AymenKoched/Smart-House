import { Module } from '@nestjs/common';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreEntity } from './entities';
import { StoresRepository } from './repositories';

@Module({
  imports: [TypeOrmModule.forFeature([StoreEntity])],
  controllers: [StoresController],
  providers: [StoresService, StoresRepository],
  exports: [StoresService],
})
export class StoresModule {}
