import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateArticuloDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  marca?: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
