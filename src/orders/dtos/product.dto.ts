import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  readonly code: string;

  @IsNotEmpty()
  @IsString()
  readonly shortCode: string;

  @IsNotEmpty()
  @IsString()
  readonly barCode: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly unit: string;

  @IsNotEmpty()
  @IsString()
  readonly unit2: string;

  @IsNotEmpty()
  @IsNumber()
  readonly coef: number;

  @IsNotEmpty()
  @IsNumber()
  readonly boxesVal: number;
}

export class UpdateProductDto extends CreateProductDto {}
