import {
  IsDateString,
  IsInt,
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

  @IsDateString()
  createDate: string;

  @IsDateString()
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
