import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EtagesService } from './etages.service';
import { createEtageDto, EtageResponse, updateEtageDto } from './dto';
import { ConvertResponse } from '../../packages';

@Controller({ path: 'etage' })
export class EtagesController {
  constructor(private readonly etagesService: EtagesService) {}

  @Get()
  @ConvertResponse(EtageResponse)
  async getAll(): Promise<EtageResponse[]> {
    const etages = await this.etagesService.findAll(['lampes', 'stores']);
    return etages.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  @Get(':id')
  @ConvertResponse(EtageResponse)
  async getById(@Param('id') id: string): Promise<EtageResponse> {
    return this.etagesService.findById(id, ['lampes', 'stores']);
  }

  @Post()
  @ConvertResponse(EtageResponse)
  async create(@Body() newEtage: createEtageDto): Promise<EtageResponse> {
    return this.etagesService.create(newEtage);
  }

  @Patch(':id')
  @ConvertResponse(EtageResponse)
  async update(
    @Param('id') id: string,
    @Body() updatedEtage: updateEtageDto,
  ): Promise<EtageResponse> {
    return this.etagesService.updateById(id, updatedEtage);
  }

  @Delete(':id')
  @ConvertResponse(EtageResponse)
  async delete(@Param('id') id: string): Promise<EtageResponse[]> {
    return this.etagesService.deleteEtage(id);
  }
}
