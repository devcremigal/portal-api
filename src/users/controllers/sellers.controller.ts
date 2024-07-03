import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SellerService } from '../services/seller.service';
import { CreateSellerDto, UpdateSellerDto } from '../dtos/seller.dto';

@Controller('sellers')
export class SellersController {
  constructor(private readonly sellerService: SellerService) {}

  @Post()
  create(@Body() createSellerDto: CreateSellerDto) {
    return this.sellerService.create(createSellerDto);
  }

  @Get()
  findAll() {
    return this.sellerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') code: string) {
    return this.sellerService.findOne(code);
  }

  @Patch(':id')
  update(@Param('id') code: string, @Body() updateSellerDto: UpdateSellerDto) {
    return this.sellerService.update(code, updateSellerDto);
  }

  @Delete(':id')
  remove(@Param('id') code: string) {
    return this.sellerService.remove(code);
  }
}
