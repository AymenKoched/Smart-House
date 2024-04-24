import { Controller, UseGuards } from '@nestjs/common';

import { StoresService } from '../services';
import { JwtAuthGuard } from '../../users';

@UseGuards(JwtAuthGuard)
@Controller()
export class StoresController {
  constructor(private readonly storesService: StoresService) {}
}
