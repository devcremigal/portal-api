import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateDeliveryAddressDto {
  @IsNotEmpty()
  @IsString()
  readonly customerId: string;

  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsNumber()
  readonly lat: number;

  @IsNotEmpty()
  @IsNumber()
  readonly long: number;

  @IsNotEmpty()
  @IsString()
  readonly postalCode: string;
}

export class UpdateDeliveryAddressDto extends CreateDeliveryAddressDto {}
