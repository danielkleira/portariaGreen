import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Boleto } from './entities/boleto.entity';
import { Lote } from 'src/lotes/entities/lote.entity';
import { unidadesMap } from 'src/utils/translate';

@Injectable()
export class BoletosService {
  constructor(
    @InjectRepository(Boleto)
    private readonly boletoRepository: Repository<Boleto>,
    @InjectRepository(Lote)
    private readonly loteRepository: Repository<Lote>,
  ) {}

  async create(
    nome_sacado: string,
    loteId: number,
    valor: number,
    linha_digitavel: string,
  ): Promise<Boleto> {
    const newId = unidadesMap[loteId];
    const lote = await this.loteRepository.findOneBy({ id: newId });
    const boleto = new Boleto();
    boleto.id_lote = lote || newId;
    boleto.nome_sacado = nome_sacado;
    boleto.valor = valor;
    boleto.linhaDigitavel = linha_digitavel;
    return this.boletoRepository.save(boleto);
  }

  findAll(): Promise<Boleto[]> {
    return this.boletoRepository.find();
  }
}
