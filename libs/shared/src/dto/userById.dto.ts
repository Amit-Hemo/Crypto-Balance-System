import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { UserIdDto } from './user-id.dto';

export class UserByIdForAdminDto extends UserIdDto {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  selectUserId: number;
}
