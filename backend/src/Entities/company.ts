import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'company ' })
export default class Company extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
  @Column() website: string;
  @Column() phone: string;
  @Column() address: string;
  @Column() city: string;
  @Column() state: string;
  @Column() country: string;
  @Column() industry: string;
}