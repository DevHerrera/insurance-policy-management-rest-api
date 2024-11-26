import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { InsurancePolicy } from './insurancePolicy.entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ nullable: false })
  fullName: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @OneToMany(() => InsurancePolicy, (insurancePolicy) => insurancePolicy.user)
  insurancePolicies: InsurancePolicy[];
}
