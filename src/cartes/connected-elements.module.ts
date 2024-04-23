import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConnectedElementEntity } from './entities';
import { ConnectedElementService } from './services';
import { ConnectedElementRepository } from './repositories';

@Module({
  imports: [TypeOrmModule.forFeature([ConnectedElementEntity])],
  controllers: [],
  providers: [ConnectedElementService, ConnectedElementRepository],
  exports: [ConnectedElementService],
})
export class ConnectedElementsModule {}
