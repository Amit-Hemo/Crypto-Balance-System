import { IntersectionType } from '@nestjs/mapped-types';
import { IsNumber, IsPositive } from 'class-validator';
import { BaseAssetDto } from './base-asset.dto';
import { UserIdDto } from './user-id.dto';

export class AddAssetDto extends BaseAssetDto {
  @IsNumber()
  @IsPositive()
  amount: number;
}

export class AddAssetPayloadDto extends IntersectionType(
  AddAssetDto,
  UserIdDto,
) {}
