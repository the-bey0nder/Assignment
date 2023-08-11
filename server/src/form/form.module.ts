import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { formdata } from './entities/form.entity';

@Module({
  imports: [TypeOrmModule.forFeature([formdata])],
  controllers: [FormController],
  providers: [FormService],
})
export class FormModule {}
