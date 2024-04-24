import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CartesModule, ConnectedElementsModule } from '../cartes';
import { EtagesModule } from '../etages';

import { LampesRepository, StoresRepository } from './repositories';
import { DeviceEntity, LampeEntity, StoreEntity } from './entities';
import { LampesController, StoresController } from './controllers';
import { LampesService, StoresService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([LampeEntity, StoreEntity, DeviceEntity]),
    forwardRef(() => ConnectedElementsModule),
    forwardRef(() => CartesModule),
    forwardRef(() => EtagesModule),
  ],
  controllers: [LampesController, StoresController],
  providers: [LampesService, LampesRepository, StoresService, StoresRepository],
  exports: [LampesService, StoresService],
})
export class DevicesModule {}
