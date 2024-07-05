import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTypePaymentDto {
  @IsNotEmpty()
  @IsString()
  readonly code: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;
}

export class UpdateTypePaymentDto extends CreateTypePaymentDto {}
