import { IsString, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePriceTableItemDto } from './price-table-item.dto';

export class CreatePriceTableDto {
  @IsNotEmpty()
  @IsString()
  readonly code: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ValidateNested({ each: true })
  @Type(() => CreatePriceTableItemDto)
  @IsArray()
  readonly priceTableItems: CreatePriceTableItemDto[];
}

export class UpdatePriceTableDto extends CreatePriceTableDto {}
