import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PaymentReceipt } from '../entities/payment-receipt.entity';
import { PaymentInvoice } from '../entities/payment-invoice.entity';
import { PaymentValue } from '../entities/payment-value.entity';

import { CreatePaymentReceiptDto } from '../dtos/payment-receipt.dto';

import { CustomersService } from 'src/users/services/customers.service';
import { UsersService } from 'src/users/services/users.service';
import { InvoicesService } from './invoices.service';
import { TypePaymentsService } from './type-payments.service';

@Injectable()
export class PaymentReceiptService {
  constructor(
    @InjectRepository(PaymentReceipt)
    private paymentReceiptRepo: Repository<PaymentReceipt>,
    @InjectRepository(PaymentValue)
    private paymentValueRepo: Repository<PaymentValue>,
    @InjectRepository(PaymentInvoice)
    private paymentInvoiceRepo: Repository<PaymentInvoice>,
    private customerService: CustomersService,
    private userService: UsersService,
    private invoiceService: InvoicesService,
    private typePaymentService: TypePaymentsService,
  ) {}

  async create(createPaymentReceiptDto: CreatePaymentReceiptDto) {
    const paymentReceipt = new PaymentReceipt();

    const customer = await this.customerService.findOne(
      createPaymentReceiptDto.customerId,
    );

    const user = await this.userService.findOne(createPaymentReceiptDto.userId);

    paymentReceipt.customer = customer;
    paymentReceipt.user = user;
    paymentReceipt.date = createPaymentReceiptDto.date;
    paymentReceipt.time = createPaymentReceiptDto.time;
    paymentReceipt.state = createPaymentReceiptDto.state;
    paymentReceipt.obs = createPaymentReceiptDto.obs;

    const savedReceipt = await this.paymentReceiptRepo.save(paymentReceipt);

    //----------------------------------------
    // Guardar los valores de pago asociados
    //----------------------------------------
    if (
      createPaymentReceiptDto.paymentValues &&
      createPaymentReceiptDto.paymentValues.length > 0
    ) {
      const paymentValues = [];

      for (const paymentValueDto of createPaymentReceiptDto.paymentValues) {
        const paymentValue = new PaymentValue();
        const typePayment = await this.typePaymentService.findOne(
          paymentValueDto.typePayment,
        );

        paymentValue.number = paymentValueDto.number;
        paymentValue.createDate = new Date(paymentValueDto.createDate);
        paymentValue.expirationDate = new Date(paymentValueDto.expirationDate);
        paymentValue.bankCode = paymentValueDto.bankCode;
        paymentValue.bankBranch = paymentValueDto.bankBranch;
        paymentValue.bankAccount = paymentValueDto.bankAccount;
        paymentValue.chkScan = paymentValueDto.chkScan;
        paymentValue.chkBank = paymentValueDto.chkBank;
        paymentValue.chkBranch = paymentValueDto.chkBranch;
        paymentValue.chkAccount = paymentValueDto.chkAccount;
        paymentValue.chkIdCuit = paymentValueDto.chkIdCuit;
        paymentValue.chkIdDNI = paymentValueDto.chkIdDNI;
        paymentValue.obs = paymentValueDto.obs;
        paymentValue.typePayment = typePayment;
        paymentValue.value = paymentValueDto.value;
        paymentValue.paymentReceipt = savedReceipt;

        paymentValues.push(paymentValue);
      }

      this.paymentValueRepo.save(paymentValues);
    } else {
      throw new NotFoundException(
        'El recibo debe tener al menos un valor de pago',
      );
    }

    //----------------------------------------------------
    // Si existe, cargo las facturas asociadas al recibo
    //----------------------------------------------------
    if (
      createPaymentReceiptDto.paymentInvoices &&
      createPaymentReceiptDto.paymentInvoices.length > 0
    ) {
      const paymentInvoices = [];

      for (const paymentInvoiceDto of createPaymentReceiptDto.paymentInvoices) {
        const paymentInvoice = new PaymentInvoice();

        paymentInvoice.invoice = await this.invoiceService.findOne(
          paymentInvoiceDto.invoiceId,
        );
        paymentInvoice.paymentValue = paymentInvoiceDto.paymentValue;
        paymentInvoice.paymentReceipt = savedReceipt;

        paymentInvoices.push(paymentInvoice);
      }

      this.paymentInvoiceRepo.save(paymentInvoices);
    }

    //---------------------------------------------
    // Actualizar el balance de las facturas
    // Recorro de nuevo porque en esta instancia
    // Me aseguro que el recibo se haya grabado
    //---------------------------------------------
    if (
      createPaymentReceiptDto.paymentInvoices &&
      createPaymentReceiptDto.paymentInvoices.length > 0
    ) {
      for (const paymentInvoiceDto of createPaymentReceiptDto.paymentInvoices) {
        await this.invoiceService.updateBalance(
          paymentInvoiceDto.invoiceId,
          paymentInvoiceDto.paymentValue,
        );
      }
    }

    return savedReceipt;
  }

  async remove(id: number) {
    const paymentReceipt = await this.paymentReceiptRepo.findOne({
      where: { id },
      relations: ['paymentInvoices.invoice'],
    });

    if (!paymentReceipt) {
      throw new NotFoundException(`Recibo con ID ${id} no encontrado`);
    }

    console.log(paymentReceipt.paymentInvoices);

    //---------------------------------------------
    // Actualizar el balance de las facturas
    //---------------------------------------------
    for (const paymentInvoice of paymentReceipt.paymentInvoices) {
      await this.invoiceService.updateBalance(
        paymentInvoice.invoice.id,
        paymentInvoice.paymentValue * -1,
      );
    }

    await this.paymentInvoiceRepo.delete({ paymentReceipt: { id } });
    await this.paymentValueRepo.delete({ paymentReceipt: { id } });

    return this.paymentReceiptRepo.delete(id);
  }
}
