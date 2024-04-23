import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CartesService } from '../services';
import { ConvertResponse } from '../../../packages';
import { CarteResponse, createCarteDto, updateCarteDto } from '../dto';

@Controller({ path: 'carte' })
export class CartesController {
  constructor(private readonly cartesService: CartesService) {}

  @Get()
  @ConvertResponse(CarteResponse)
  async getAll(): Promise<CarteResponse[]> {
    const cartes = await this.cartesService.findAll([
      'lampes',
      'stores',
      'connectedElements',
    ]);
    return cartes.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  @Get('/:id')
  @ConvertResponse(CarteResponse)
  async getById(@Param('id') id: string): Promise<CarteResponse> {
    return this.cartesService.findById(id, [
      'lampes',
      'stores',
      'connectedElements',
    ]);
  }

  @Post()
  @ConvertResponse(CarteResponse)
  async create(@Body() newCarte: createCarteDto): Promise<CarteResponse> {
    return this.cartesService.createCarte(newCarte);
  }

  @Patch(':id')
  @ConvertResponse(CarteResponse)
  async update(
    @Param('id') id: string,
    @Body() updatedCarte: updateCarteDto,
  ): Promise<CarteResponse> {
    return this.cartesService.updateById(id, updatedCarte);
  }

  @Delete(':id')
  @ConvertResponse(CarteResponse)
  async delete(@Param('id') id: string): Promise<CarteResponse[]> {
    return this.cartesService.deleteCarte(id);
  }
}
