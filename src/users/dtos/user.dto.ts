import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @Length(1, 50, { message: 'El nombre debe tener entre 1 y 50 caracteres' })
  readonly name: string;

  @IsString({ message: 'El tipo de usuario debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El tipo de usuario es obligatorio' })
  @Length(1, 3, {
    message: 'El tipo de usuario debe tener entre 1 y 3 caracteres',
  })
  readonly typeUser: string;

  @IsString({ message: 'El correo electrónico debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  readonly email: string;

  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @Length(6, 50, {
    message: 'La contraseña debe tener entre 6 y 50 caracteres',
  })
  password: string;
}

export class LoginUserDto {
  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  readonly email: string;

  @Length(6, 50, {
    message: 'La contraseña debe tener entre 6 y 50 caracteres',
  })
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
