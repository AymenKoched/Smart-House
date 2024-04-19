import { Controller } from '@nestjs/common';
import { EtagesService } from './etages.service';

@Controller()
export class EtagesController {
  constructor(private readonly etagesService: EtagesService) {}
}
