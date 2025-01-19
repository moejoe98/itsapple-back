import { IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { Direction } from 'src/@types/Settings';

export class CreateWithdrawDto {
  @IsString()
  clientPhone: string;

  @IsEnum(Direction)
  direction: Direction;

  @IsNumber({})
  usdtAmount: number;

  @IsOptional()
  @IsNumber({})
  receivedAmount?: number;

  @IsOptional()
  @IsNumber({})
  givenAmount?: number;

  @IsNumber({})
  chainFee: number;

  @IsString()
  chain: string;

  @IsString()
  clientWallet: string;
}
