import { Lote } from 'src/lotes/entities/lote.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Boleto {
  @PrimaryGeneratedColumn({ type: 'int' })
  readonly id: number;

  @Column({ length: 255 })
  nome_sacado: string;

  @ManyToOne(() => Lote, (lote) => lote.id)
  id_lote: Lote;

  @Column({ default: true })
  ativo: boolean;

  @CreateDateColumn()
  criado_em: Date;

  @UpdateDateColumn()
  atualizado_em: Date;

  @Column({ nullable: true })
  valor: number;

  @Column({ length: 255, nullable: true })
  linhaDigitavel: string;
}
