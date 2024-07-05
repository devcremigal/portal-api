import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryAddressesService } from './delivery-addresses.service';

describe('DeliveryAddressesService', () => {
  let service: DeliveryAddressesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveryAddressesService],
    }).compile();

    service = module.get<DeliveryAddressesService>(DeliveryAddressesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
