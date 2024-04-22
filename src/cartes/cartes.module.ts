import { forwardRef, Module } from '@nestjs/common';
import { CartesController } from './controllers';
import { CartesService } from './services';
import { CartesRepository, ConnectedElementRepository } from './repositories';
import { CarteEntity } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevicesModule } from '../devices';
import { ConnectedElementService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([CarteEntity]),
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
