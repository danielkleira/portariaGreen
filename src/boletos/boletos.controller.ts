import { Controller, Get, Post, Body } from '@nestjs/common';
import { BoletosService } from './boletos.service';
import { CreateBoletoDto } from './dto/create-boleto.dto';

@Controller('boletos')
export class BoletosController {
  constructor(private readonly boletosService: BoletosService) {}

  @Post()
  create(@Body() CreateBoletoDto: CreateBoletoDto) {
    return this.boletosService.create(
      CreateBoletoDto.nome_sacado,
      CreateBoletoDto.id_lote,
      CreateBoletoDto.valor,
      CreateBoletoDto.linha_digitavel,
    );
  }

  @Get()
  findAll() {
    return this.boletosService.findAll();
  }
}
