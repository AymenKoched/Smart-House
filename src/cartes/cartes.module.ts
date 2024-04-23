import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DevicesModule } from '../devices';

import { CartesController } from './controllers';
import { CartesService } from './services';
import { CartesRepository } from './repositories';
import { CarteEntity } from './entities';
import { ConnectedElementsModule } from './connected-elements.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CarteEntity]),
    forwardRef(() => ConnectedElementsModule),
    forwardRef(() => DevicesModule),
  ],
  controllers: [CartesController],
  providers: [CartesService, CartesRepository],
  exports: [CartesService],
})
export class CartesModule {}
