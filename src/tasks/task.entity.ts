import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Index } from 'typeorm';
@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index()
  @Column()
  title: string;
  @Column({ default: false })
  completed!: boolean;

  @ManyToOne(() => User, (user) => user.tasks)
  user!: User;
}
