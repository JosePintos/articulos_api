import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ArticuloDto {
  @ApiProperty({ example: 'Gaseosa' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'Pepsi' })
  @IsString()
  marca: string;

  @ApiProperty({ example: true })
  activo: boolean;
}
