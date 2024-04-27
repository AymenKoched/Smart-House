import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { StoresService } from '../services';
import { JwtAuthGuard } from '../../users';
import { CreateStoreDto, StoreResponse } from '../dto';
import { ConvertResponse } from '../../../packages';

@UseGuards(JwtAuthGuard)
@Controller({ path: 'store' })
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get()
  @ConvertResponse(StoreResponse)
  async getAll(): Promise<StoreResponse[]> {
    const stores = await this.storesService.findAll(['carte', 'etage']);
    return stores.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  @Get(':id')
  @ConvertResponse(StoreResponse)
  async getById(@Param('id') id: string): Promise<StoreResponse> {
    return await this.storesService.findById(id, ['carte', 'etage']);
  }

  @Post()
  @ConvertResponse(StoreResponse)
  async create(@Body() newStore: CreateStoreDto): Promise<StoreResponse> {
    return this.storesService.createStore(newStore);
  }

  @Delete(':id')
  @ConvertResponse(StoreResponse)
  async delete(@Param('id') id: string): Promise<StoreResponse[]> {
    return this.storesService.deleteStoreById(id);
  }

  @Get('toggle/up/:delay/:id')
  @ConvertResponse(StoreResponse)
  async upStore(
    @Param('id') id: string,
    @Param('delay') delay: number,
  ): Promise<StoreResponse> {
    return this.storesService.upStore(id, delay);
  }

  @Get('toggle/down/:delay/:id')
  @ConvertResponse(StoreResponse)
  async downStore(
    @Param('id') id: string,
    @Param('delay') delay: number,
  ): Promise<StoreResponse> {
    return this.storesService.downStore(id, delay);
  }
}
