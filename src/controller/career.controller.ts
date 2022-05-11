import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CareerService } from 'src/service/career.service';

@ApiTags('커리어 정보 API')
@Controller('careers')
export class CareerController {
  constructor(private careerService: CareerService) {}

  @ApiOperation({
    summary: '모든 커리어 정보 조회 API',
    description: '모든 커리어 정보를 조회합니다.',
  })
  @Get()
  async getAllCareers() {
    return await this.careerService.getAllCareers();
  }
}
