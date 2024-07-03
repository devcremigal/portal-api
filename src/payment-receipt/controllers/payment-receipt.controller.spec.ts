import { Test, TestingModule } from '@nestjs/testing';
import { PaymentReceiptController } from './payment-receipt.controller';
import { PaymentReceiptService } from './payment-receipt.service';

describe('PaymentReceiptController', () => {
  let controller: PaymentReceiptController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentReceiptController],
      providers: [PaymentReceiptService],
    }).compile();

    controller = module.get<PaymentReceiptController>(PaymentReceiptController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
