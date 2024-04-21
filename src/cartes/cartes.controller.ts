import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CartesService } from './cates.service';
import { ConvertResponse } from '../../packages';
import { CarteResponse, createCarteDto, updateCarteDto } from './dto';

@Controller({ path: 'carte' })
export class CartesController {
  constructor(private readonly cartesService: CartesService) {}

  @Get()
  @ConvertResponse(CarteResponse)
  async getAll(): Promise<CarteResponse[]> {
    const cartes = await this.cartesService.findAll();
    return cartes.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  @Get('/:id')
  @ConvertResponse(CarteResponse)
  async getById(@Param('id') id: string): Promise<CarteResponse> {
    return this.cartesService.findById(id);
  }

  @Post()
  @ConvertResponse(CarteResponse)
  async create(@Body() newCarte: createCarteDto): Promise<CarteResponse> {
    return this.cartesService.create(newCarte);
  }

  @Patch(':id')
  @ConvertResponse(CarteResponse)
  async updateCarte(
    @Param('id') id: string,
    @Body() updatedCarte: updateCarteDto,
  ): Promise<CarteResponse> {
    return this.cartesService.updateById(id, updatedCarte);
  }

  @Delete(':id')
  @ConvertResponse(CarteResponse)
  async deleteCarte(@Param('id') id: string): Promise<CarteResponse[]> {
    return this.cartesService.deleteById(id);
  }
}
