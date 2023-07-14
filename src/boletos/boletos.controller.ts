import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BoletosService } from './boletos.service';
import { CreateBoletoDto } from './dto/create-boleto.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Express } from 'express';

@Controller('boletos')
export class BoletosController {
  constructor(private readonly boletosService: BoletosService) {}

  @Post('import')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/csv',
      }),
    }),
  )
  uploadCsv(@UploadedFile() file: Express.Multer.File) {
    return this.boletosService.importCsv(file.path);
  }

  @Post('import/pdf/')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/pdf',
      }),
    }),
  )
  uploadPdf(@UploadedFile() file: Express.Multer.File) {
    return this.boletosService.importPdf(file.path);
  }

  @Get()
  findBy(
    @Query('nome') nome?: string,
    @Query('valor_inicial') valorInicial?: number,
    @Query('valor_final') valorFinal?: number,
    @Query('id_lote') idLote?: number,
    @Query('relatorio') relatorio?: number,
  ) {
    return this.boletosService.findBy(
      nome,
      valorInicial,
      valorFinal,
      idLote,
      relatorio,
    );
  }
}
