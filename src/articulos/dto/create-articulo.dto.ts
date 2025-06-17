import { IsString, IsNotEmpty } from 'class-validator';

export class CreateArticuloDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  marca: string;
}
