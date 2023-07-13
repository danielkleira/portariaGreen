import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BoletosService } from './boletos.service';
import { CreateBoletoDto } from './dto/create-boleto.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as csvParser from 'csv-parser';
import * as fs from 'fs';
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
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const filePath = file.path;
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => {
        this.boletosService.create(
          row['nome'],
          row['unidade'],
          row['valor'],
          row['linha_digitavel'],
        );
      })
      .on('end', () => {
        fs.unlinkSync(filePath);
      });
  }

  @Get()
  findAll() {
    return this.boletosService.findAll();
  }
}
