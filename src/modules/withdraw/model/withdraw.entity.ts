import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export default class Withdraw {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  clientPhone: string;

  @Column({ length: 25 })
  direction: string;

  @Column({ length: 25 })
  clientWallet: string;

  @Column('float')
  usdtAmount: number;

  @Column('float')
  profit: number;

  @Column('float')
  chainFee: number;

  @Column('float', { default: 0 })
  receivedAmount: number; //buy

  @Column('float', { default: 0 })
  givenAmount: number; // sell

  @Column({ length: 25 })
  chain: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;
}
