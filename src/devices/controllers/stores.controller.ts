import { Controller } from '@nestjs/common';

import { StoresService } from '../services';

@Controller()
export class StoresController {
  constructor(private readonly storesService: StoresService) {}
}
