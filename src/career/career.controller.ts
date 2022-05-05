import { Controller } from '@nestjs/common';
import { CareerService } from './career.service';

@Controller('api/careers')
export class CareerController {
  constructor(private readonly careerService: CareerService) {}
}
