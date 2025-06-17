import { IsOptional, IsString } from 'class-validator';

export class GetFilteredArticulosDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  marca?: string;

  @IsOptional()
  activo?: string;
}
