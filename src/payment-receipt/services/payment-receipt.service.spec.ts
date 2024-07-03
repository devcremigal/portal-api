import { Test, TestingModule } from '@nestjs/testing';
import { PaymentReceiptService } from './payment-receipt.service';

describe('PaymentReceiptService', () => {
  let service: PaymentReceiptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentReceiptService],
    }).compile();

    service = module.get<PaymentReceiptService>(PaymentReceiptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
