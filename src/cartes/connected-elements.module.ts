import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DevicesModule } from '../devices';

import { ConnectedElementEntity } from './entities';
import { ConnectedElementService } from './services';
import { ConnectedElementRepository } from './repositories';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConnectedElementEntity]),
    forwardRef(() => DevicesModule),
  ],
  controllers: [],
  providers: [ConnectedElementService, ConnectedElementRepository],
  exports: [ConnectedElementService],
})
export class ConnectedElementsModule {}
