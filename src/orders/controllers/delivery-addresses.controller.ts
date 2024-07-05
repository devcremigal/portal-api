import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { DeliveryAddressesService } from '../services/delivery-addresses.service';
import {
  CreateDeliveryAddressDto,
  UpdateDeliveryAddressDto,
} from '../dtos/delivery-address.dto';

@Controller('delivery-addresses')
export class DeliveryAddressesController {
  constructor(
    private readonly deliveryAddressService: DeliveryAddressesService,
  ) {}

  @Post()
  async create(@Body() createDeliveryAddressDto: CreateDeliveryAddressDto) {
    return this.deliveryAddressService.create(createDeliveryAddressDto);
  }

  @Get()
  async findAll() {
    return this.deliveryAddressService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.deliveryAddressService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDeliveryAddressDto: UpdateDeliveryAddressDto,
  ) {
    return this.deliveryAddressService.update(+id, updateDeliveryAddressDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.deliveryAddressService.remove(+id);
  }
}
