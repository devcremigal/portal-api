import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateSellerDto {
  @IsString({ message: 'El código debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El código es obligatorio' })
  @Length(1, 10, { message: 'El código debe tener entre 1 y 10 caracteres' })
  readonly code: string;

  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @Length(1, 50, { message: 'El nombre debe tener entre 1 y 50 caracteres' })
  readonly name: string;
}

export class UpdateSellerDto extends PartialType(CreateSellerDto) {}
