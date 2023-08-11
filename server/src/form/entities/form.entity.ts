import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class formdata {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  file_name: string;

  @Column({ type: 'bytea', nullable: false })
  pdf_content: Buffer;
}
