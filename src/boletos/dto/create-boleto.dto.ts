import { IsInt, IsNotEmpty, IsString } from 'class-validator';
export class CreateBoletoDto {
  @IsString()
  @IsNotEmpty()
  nome_sacado: string;

  @IsInt()
  @IsNotEmpty()
  id_lote: number;

  @IsInt()
  @IsNotEmpty()
  valor: number;

  @IsString()
  @IsNotEmpty()
  linha_digitavel: string;
}
