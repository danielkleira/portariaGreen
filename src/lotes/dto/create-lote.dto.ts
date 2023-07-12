import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLoteDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsOptional()
  boletoid: number;
}
