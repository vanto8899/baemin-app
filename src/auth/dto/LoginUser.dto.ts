import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';

export class LoginUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @ValidateIf((o) => !o.email && !o.phone)
  readonly username?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @ValidateIf((o) => !o.username && !o.phone)
  readonly email?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @ValidateIf((o) => !o.username && !o.email)
  readonly phone?: string;

  @ApiProperty()
  @IsNotEmpty() // Bắt buộc phải nhập password
  @IsString()
  readonly password: string;
}
