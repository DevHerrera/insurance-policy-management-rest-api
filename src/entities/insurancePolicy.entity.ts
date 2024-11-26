import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Company } from './company.entity';

export enum InsurancePolicyStatus {
  ACTIVE = 'active',
  EXPIRED = 'expired',
  CANCELED = 'canceled',
}

@Entity()
export class InsurancePolicy {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false })
  startDate: Date;

  @Column({ nullable: false })
  endDate: Date;

  @Column({ nullable: false, type: 'float' })
  coverageAmount: number;

  @Column({ nullable: false, type: 'float' })
  premium: number;

  @Column({
    enum: InsurancePolicyStatus,
    nullable: false,
    type: 'enum',
    default: InsurancePolicyStatus.ACTIVE,
  })
  status: InsurancePolicyStatus;

  @ManyToOne(() => Company, (company) => company.insurancePolicies)
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @Column({
    nullable: false,
    type: 'uuid',
  })
  companyId: string;

  @ManyToOne(() => User, (user) => user.insurancePolicies)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({
    nullable: false,
    type: 'uuid',
  })
  userId: string;
}
