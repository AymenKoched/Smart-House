import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LampesRepository, StoresRepository } from './repositories';
import { LampeEntity, StoreEntity } from './entities';
import { LampesController, StoresController } from './controllers';
import { LampesService, StoresService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([LampeEntity, StoreEntity])],
  controllers: [LampesController, StoresController],
  providers: [LampesService, LampesRepository, StoresService, StoresRepository],
  exports: [LampesService, StoresService],
})
export class DevicesModule {}
