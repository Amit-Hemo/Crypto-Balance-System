import { IntersectionType } from '@nestjs/mapped-types';
import { IsLowercase, IsString, MaxLength, MinLength } from 'class-validator';
import { UserIdDto } from './user-id.dto';

export class CurrencyDto {
  @IsString()
  @IsLowercase()
  @MinLength(3)
  @MaxLength(4)
  currency: string;
}

export class CurrencyQueryDto extends CurrencyDto {}

export class BalanceValueDto extends IntersectionType(UserIdDto, CurrencyDto) {}
