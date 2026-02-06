import { IntersectionType, PickType } from '@nestjs/mapped-types';
import { IsNumber, IsPositive } from 'class-validator';
import { BaseAssetDto } from './base-asset.dto';
import { UserIdDto } from './user-id.dto';

export class RemoveAssetDto {
  @IsNumber()
  @IsPositive()
  amount: number;
}

export class RemoveAssetPayloadDto extends IntersectionType(
  PickType(BaseAssetDto, ['searchId'] as const),
  RemoveAssetDto,
  UserIdDto,
) {}
