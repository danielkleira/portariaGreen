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
    const lote = new Lote();
    lote.nome = nome;
    return this.loteRepository.save(lote);
  }

  findAll(): Promise<Lote[]> {
    return this.loteRepository.find();
  }
}
