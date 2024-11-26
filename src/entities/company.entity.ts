import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { InsurancePolicy } from './insurancePolicy.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => InsurancePolicy, (insurancePolicy) => insurancePolicy.user)
  insurancePolicies: InsurancePolicy[];
}
