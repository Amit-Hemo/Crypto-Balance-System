import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class UserIdDto {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  userId: number;
}
