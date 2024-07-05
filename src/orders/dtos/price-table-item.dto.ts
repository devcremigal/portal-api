import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePriceTableItemDto {
  @IsNotEmpty()
  @IsString()
  readonly priceTableCode: string;

  @IsNotEmpty()
  @IsNumber()
  readonly productId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;
}
