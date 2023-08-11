import { Controller, Get, Body, Param, Put } from '@nestjs/common';
import { FormService } from './form.service';
import { UpdateFormDto } from './dto/update-form.dto';

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Get(':id')
  findOne(@Param('id') id: number) {
    console.log(id);
    return this.formService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateFormDto: UpdateFormDto) {
    return this.formService.update(id, updateFormDto);
  }
}
