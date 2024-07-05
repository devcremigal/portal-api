import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { PriceTableService } from '../services/price-table.service';
import {
  CreatePriceTableDto,
  UpdatePriceTableDto,
} from '../dtos/price-table.dto';

@Controller('price-tables')
export class PriceTableController {
  constructor(private readonly priceTableService: PriceTableService) {}

  @Post()
  async create(@Body() createPriceTableDto: CreatePriceTableDto) {
    return this.priceTableService.create(createPriceTableDto);
  }

  @Get()
  async findAll() {
    return this.priceTableService.findAll();
  }

  @Get(':code')
  async findOne(@Param('code') code: string) {
    return this.priceTableService.findOne(code);
  }

  @Patch(':code')
  async update(
    @Param('code') code: string,
    @Body() updatePriceTableDto: UpdatePriceTableDto,
  ) {
    return this.priceTableService.update(code, updatePriceTableDto);
  }

  @Delete(':code')
  async remove(@Param('code') code: string) {
    return this.priceTableService.remove(code);
  }
}
