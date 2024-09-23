import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, IsEnum } from 'class-validator';
import { Role } from '@prisma/client'; // Import Role enum from Prisma
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly fullname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' })
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly phone?: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(8, 20, { message: 'Password must be between 8 and 20 characters' })
  readonly password: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Role, { message: 'Role must be either CUSTOMER or ADMIN' })
  readonly role: Role = Role.CUSTOMER; // Default to CUSTOMER

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly address?: string;
}