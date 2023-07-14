import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Boleto } from './entities/boleto.entity';
import { Lote } from 'src/lotes/entities/lote.entity';
import * as csvParser from 'csv-parser';
import * as fs from 'fs';
import * as path from 'path';
import { PDFExtract } from 'pdf.js-extract';
import { PDFDocument, StandardFonts } from 'pdf-lib';

@Injectable()
export class BoletosService {
  constructor(
    @InjectRepository(Boleto)
    private readonly boletoRepository: Repository<Boleto>,
    @InjectRepository(Lote)
    private readonly loteRepository: Repository<Lote>,
  ) {}

  async importCsv(filePath: string): Promise<void> {
    const todosLotes = await this.loteRepository.find();

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => {
        const lote = todosLotes.filter(
          (lote) => parseInt(lote.nome) === parseInt(row['unidade']),
        );
        const boleto = new Boleto();
        boleto.id_lote = lote[0];
        boleto.nome_sacado = row['nome'];
        boleto.valor = row['valor'];
        boleto.linha_digitavel = row['linha_digitavel'];
        return this.boletoRepository.save(boleto);
      })
      .on('end', () => {
        fs.unlinkSync(filePath);
      });
  }

  async importPdf(file: string): Promise<void> {
    const todosBoletos = await this.boletoRepository.find();
    const pdfExtract = new PDFExtract();
    const pdfData = await pdfExtract.extract(file);
    const outputDir = path.join(__dirname, '..', '..', 'uploads', 'pdf');

    for (const page of pdfData.pages) {
      const pdfDoc = await PDFDocument.create();
      const boleto = todosBoletos.filter(
        (item) => item.nome_sacado === page.content[0].str,
      );
      const pageObj = pdfDoc.addPage([
        page.pageInfo.width,
        page.pageInfo.height,
      ]);
      const content = page.content[0].str;
      pageObj.drawText(content, {
        x: 50,
        y: page.pageInfo.height - 50,
        size: 10,
      });
      const fileName = `${boleto[0].id}.pdf`;
      const pdfBytes = await pdfDoc.save();
      const filePath = path.join(outputDir, fileName);
      fs.writeFileSync(filePath, pdfBytes);
    }
    fs.unlinkSync(file);
  }

  async findBy(
    nome?: string,
    valorInicial?: number,
    valorFinal?: number,
    idLote?: number,
    relatorio?: number,
  ) {
    const todosBoletos = await this.boletoRepository
      .createQueryBuilder('boleto')
      .leftJoinAndSelect('boleto.id_lote', 'lote')
      .getMany();

    const boletosFiltrados = todosBoletos.filter((boleto) => {
      const atendeNome = nome ? boleto.nome_sacado.includes(nome) : true;
      const atendeIdLote = idLote ? Number(boleto.id_lote.id) == idLote : true;
      const atendeValorInicial = valorInicial
        ? boleto.valor >= valorInicial
        : true;
      const atendeValorFinal = valorFinal ? boleto.valor <= valorFinal : true;

      return (
        atendeNome && atendeIdLote && atendeValorInicial && atendeValorFinal
      );
    });
    if (relatorio == 1) {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage();

      //Seleciona padroes para o texto pdf
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontSize = 10;
      const lineHeight = fontSize * 1.2;
      let yOffset = page.getHeight() - 50;

      //Cria estilo do pdf para o titulo
      const headerLine =
        'id | nome_sacado | id_lote | valor | linha_digitavel ';
      page.drawText(headerLine, {
        x: 50,
        y: yOffset,
        font,
        size: fontSize,
        lineHeight,
      });
      yOffset -= lineHeight;

      //Adiciona o conteudo das queries para o pdf
      for (const boleto of todosBoletos) {
        const line = `${boleto.id} | ${boleto.nome_sacado} | ${Number(
          boleto.id_lote.id,
        )} | ${boleto.valor} | ${boleto.linha_digitavel}  `;
        page.drawText(line, { x: 50, y: yOffset, size: 10 });
        yOffset -= 20;
      }
      //Salva o PDF
      const pdfBytes = await pdfDoc.save();

      //Transforma em base64
      const base64 = Buffer.from(pdfBytes).toString('base64');

      return { base64 };
    }
    return boletosFiltrados;
  }
}
