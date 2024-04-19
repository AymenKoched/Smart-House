import { Controller } from '@nestjs/common';
import { CartesService } from './cates.service';

@Controller({ path: 'carte' })
export class CartesController {
  constructor(private readonly cartesService: CartesService) {}
}
