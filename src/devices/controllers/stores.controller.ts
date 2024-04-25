import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';

import { StoresService } from '../services';
import { JwtAuthGuard } from '../../users';
import { CreateStoreDto, StoreResponse } from '../dto';
import { ConvertResponse } from '../../../packages';

@UseGuards(JwtAuthGuard)
@Controller({ path :'Store' })
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get()
  @ConvertResponse(StoreResponse)
  async getAll() : Promise<StoreResponse[]>{
    const stores = await this.storesService.findAll(['carte' , 'etage']);
    return stores.sort((a , b) => b.createdAt.getTime() - a.createdAt.getTime());
  }


  @Get('/:id')
  @ConvertResponse(StoreResponse)
  async getById(@Param('id') id : string ) : Promise<StoreResponse>{
    const store = await this.storesService.findById(id , ['carte' , 'etage'] );
    return store;
  }

  @Post()
  @ConvertResponse(StoreResponse)
  async create(@Body() newStore : CreateStoreDto) : Promise<StoreResponse>{
    return this.storesService.createStore(newStore);
  }

  @Delete('/:id')
  @ConvertResponse(StoreResponse)
  async delete(@Param('id') id : string) : Promise<StoreResponse[]>{
    return this.storesService.deleteStoreById(id);
  }

}
