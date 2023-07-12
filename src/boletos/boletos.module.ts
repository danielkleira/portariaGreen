import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoletosService } from './boletos.service';
import { BoletosController } from './boletos.controller';
import { Boleto } from './entities/boleto.entity';
import { Lote } from 'src/lotes/entities/lote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Boleto, Lote])],
  controllers: [BoletosController],
  providers: [BoletosService],
})
export class BoletosModule {}
