import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Boleto } from 'src/boletos/entities/boleto.entity';

@Entity()
export class Lote {
  @PrimaryGeneratedColumn({ type: 'int' })
  readonly id: number;

  @Column({ length: 255 })
  nome: string;

  @Column({ default: true })
  ativo: boolean;

  @CreateDateColumn()
  criado_em: Date;

  @UpdateDateColumn()
  atualizado_em: Date;

  @OneToMany(() => Boleto, (boleto) => boleto.id_lote, { nullable: true })
  boleto: Boleto[];
}
