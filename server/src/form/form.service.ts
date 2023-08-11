import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateFormDto } from './dto/update-form.dto';
import { EntityManager } from 'typeorm';
import { formdata } from './entities/form.entity';
import { InjectEntityManager } from '@nestjs/typeorm';

@Injectable()
export class FormService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  async findOne(id: number) {
    const query = `SELECT * FROM pdf_table WHERE id = $1`;
    const pdfData = await this.entityManager.query(query, [id]);
    console.log(pdfData);

    if (pdfData && pdfData.length > 0) {
      const pdfContent = pdfData[0].pdf_content;

      return {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `inline; filename=${pdfData[0].file_name}`,
        },
        body: pdfContent,
      };
    } else {
      throw new NotFoundException('PDF not found');
    }
  }

  update(id: number, updateFormDto: UpdateFormDto) {
    const form: formdata = new formdata();
    form.pdf_content = updateFormDto.pdf_content;
    const valuesArray = Object.values(form.pdf_content);
    console.log(valuesArray);

    const uint8Array = new Uint8Array(valuesArray);

    const bufferData = Buffer.from(uint8Array);
    console.log(bufferData);

    const query = `
      UPDATE pdf_table
      SET file_name = 'example.pdf', pdf_content = $1
      WHERE id = $2
    `;

    return this.entityManager.query(query, [bufferData, id]);
  }
}
