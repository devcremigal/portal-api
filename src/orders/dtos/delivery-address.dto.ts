import { IsString, IsNotEmpty, IsNumber, IsInt } from 'class-validator';

export class CreateDeliveryAddressDto {
  @IsNotEmpty()
  @IsInt()
  readonly customerId: number;

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
