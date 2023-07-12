import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lote } from './entities/lote.entity';
import { Boleto } from 'src/boletos/entities/boleto.entity';

@Injectable()
export class LotesService {
  constructor(
    @InjectRepository(Lote) private loteRepository: Repository<Lote>,
  ) {}
  async create(nome: string): Promise<Lote> {
    console.log(nome);
    const lote = new Lote();
    console.log(lote);
    lote.nome = nome;
    console.log(lote);
    return this.loteRepository.save(lote);
  }

  findAll(): Promise<Lote[]> {
    return this.loteRepository.find();
  }
}
