import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { LampesService } from '../services';
import { ConvertResponse } from '../../../packages';
import { CreateLampeDto, LampeResponse } from '../dto';
import { JwtAuthGuard } from '../../users';

@UseGuards(JwtAuthGuard)
@Controller({ path: 'lampe' })
export class LampesController {
  constructor(private readonly lampesService: LampesService) {}

  @Get()
  @ConvertResponse(LampeResponse)
  async getAll(): Promise<LampeResponse[]> {
    const lampes = await this.lampesService.findAll(['carte', 'etage']);
    return lampes.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  @Get('/:id')
  @ConvertResponse(LampeResponse)
  async getById(@Param('id') id: string): Promise<LampeResponse> {
    return this.lampesService.findById(id, ['carte', 'etage']);
  }

  @Post()
  @ConvertResponse(LampeResponse)
  async create(@Body() newLampe: CreateLampeDto): Promise<LampeResponse> {
    return this.lampesService.createLampe(newLampe);
  }

  @Delete(':id')
  @ConvertResponse(LampeResponse)
  async delete(@Param('id') id: string): Promise<LampeResponse[]> {
    return this.lampesService.deleteLampeById(id);
  }

  @Post('/toggle/:state')
  @ConvertResponse(LampeResponse)
  async toggleLampe(@Query('id') id: string, @Param('state') state: 'ON' | 'OFF') {
    return this.lampesService.ToggleLampe(id, state);
}


}
