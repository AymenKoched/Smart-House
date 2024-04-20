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

@Controller({ path: 'carte' })
export class CartesController {
  constructor(private readonly cartesService: CartesService) {}

  @Get()
  async getCartes() {
    return;
  }

  @Get('/:id')
  async getCarte(@Param('id') id: string) {
    return;
  }

  @Post()
  async createCarte(@Body() newCarte) {
    return;
  }

  @Delete(':id')
  async deleteCarte(@Param('id') id: string) {
    return;
  }

  @Patch(':id')
  async updateCarte(@Param('id') id: string) {
    return;
  }
}
