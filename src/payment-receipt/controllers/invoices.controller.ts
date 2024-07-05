import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { InvoicesService } from '../services/invoices.service';
import { CreateInvoiceDto, UpdateInvoiceDto } from '../dtos/invoice.dto';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoiceService: InvoicesService) {}

  @Post()
  async create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceService.create(createInvoiceDto);
  }

  @Get()
  async findAll() {
    return this.invoiceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.invoiceService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateInvoiceDto: UpdateInvoiceDto,
  ) {
    return this.invoiceService.update(+id, updateInvoiceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.invoiceService.remove(+id);
  }
}
