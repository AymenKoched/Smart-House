import { Controller } from '@nestjs/common';
import { LampesService } from './lampes.service';

@Controller()
export class LampesController {
  constructor(private readonly lampesService: LampesService) {}
}
