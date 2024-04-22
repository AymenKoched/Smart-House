import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DevicesModule } from '../devices';

import { CartesController } from './controllers';
import { CartesService } from './services';
import { CartesRepository, ConnectedElementRepository } from './repositories';
import { CarteEntity, ConnectedElementEntity } from './entities';
import { ConnectedElementService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([CarteEntity, ConnectedElementEntity]),
    forwardRef(() => DevicesModule),
  ],
  controllers: [CartesController],
  providers: [
    CartesService,
    CartesRepository,
    ConnectedElementService,
    ConnectedElementRepository,
  ],
  exports: [CartesService, ConnectedElementService],
})
export class CartesModule {}
