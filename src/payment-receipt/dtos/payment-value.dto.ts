import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreatePaymentValueDto {
  @IsInt()
  paymentId: number;

  @IsString()
  @Length(2, 2)
  typePayment: string;

  @IsString()
  @Length(0, 12)
  number: string;

  @IsNumber()
  value: number;

  @Type(() => Date)
  @IsDate({ message: 'La fecha debe ser una fecha válida.' })
  @IsNotEmpty({ message: 'La fecha es obligatoria' })
  createDate: Date;

  @Type(() => Date)
  @IsDate({ message: 'La fecha debe ser una fecha válida.' })
  @IsNotEmpty({ message: 'La fecha es obligatoria' })
  expirationDate: string;

  @IsString()
  @Length(0, 3)
  @IsOptional()
  bankCode?: string;

  @IsString()
  @Length(0, 5)
  @IsOptional()
  bankBranch?: string;

  @IsString()
  @Length(0, 10)
  @IsOptional()
  bankAccount?: string;

  @IsString()
  @Length(0, 31)
  @IsOptional()
  chkScan?: string;

  @IsString()
  @Length(0, 3)
  @IsOptional()
  chkBank?: string;

  @IsString()
  @Length(0, 5)
  @IsOptional()
  chkBranch?: string;

  @IsString()
  @Length(0, 10)
  @IsOptional()
  chkAccount?: string;

  @IsInt()
  @IsOptional()
  chkIdCuit?: number;

  @IsInt()
  @IsOptional()
  chkIdDNI?: number;

  @IsString()
  @Length(0, 100)
  @IsOptional()
  obs?: string;
}
