import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsBoolean, Length } from 'class-validator';

export class CreateCustomerDto {
  @IsString({ message: 'El código debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El código es obligatorio' })
  @Length(1, 6, { message: 'El código debe tener entre 1 y 6 caracteres' })
  readonly code: string;

  @IsString({ message: 'La sucursal debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La sucursal es obligatoria' })
  @Length(1, 2, { message: 'La sucursal debe tener entre 1 y 2 caracteres' })
  readonly branch: string;

  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @Length(1, 50, { message: 'El nombre debe tener entre 1 y 50 caracteres' })
  readonly name: string;

  @IsString({ message: 'El código del vendedor debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El código del vendedor es obligatorio' })
  readonly sellerCode: string;

  @IsString({
    message: 'El código de la tabla de precios debe ser una cadena de texto',
  })
  @IsNotEmpty({ message: 'El código de la tabla de precios es obligatorio' })
  readonly priceTableCode: string;

  @IsBoolean({ message: 'El estado de bloqueo debe ser un valor booleano' })
  @IsNotEmpty({ message: 'El estado de bloqueo es obligatorio' })
  readonly blocked: boolean;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
