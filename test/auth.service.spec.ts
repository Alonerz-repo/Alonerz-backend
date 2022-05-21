import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from 'src/auth/auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    console.log(service);
  });

  it('should be defined', () => {
    console.log(service);
    return expect(service).toBeDefined();
  });
});
