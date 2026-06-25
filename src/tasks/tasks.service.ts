import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Task } from './task.entity';
import { User } from '../users/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(
    userId: number,
    page = 1,
    limit = 10,
    search?: string,
  ): Promise<Task[]> {
    return this.taskRepository.find({
      where: {
        user: { id: userId },
        ...(search ? { title: Like(`%${search}%`) } : {}),
      },
      skip: (page - 1) * limit,
      take: limit,
      relations: {
        user: true,
      },
      select: {
        id: true,
        title: true,
        completed: true,
        user: {
          id: true,
          email: true,
        },
      },
    });
  }

  async create(title: string, userId: number): Promise<Task> {
    const user = await this.userRepository.findOneBy({
      id: userId,
    });

    if (!user) {
      throw new Error('User not found');
    }

    const task = this.taskRepository.create({
      title,
      completed: false,
      user,
    });

    return this.taskRepository.save(task);
  }

  findOne(id: number): Promise<Task | null> {
    return this.taskRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
      select: {
        id: true,
        title: true,
        completed: true,
        user: {
          id: true,
          email: true,
        },
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }

  async update(id: number, completed: boolean): Promise<Task | null> {
    await this.taskRepository.update(id, { completed });
    return this.findOne(id);
  }
  async getUserTaskStats() {
    return this.taskRepository
      .createQueryBuilder('task')
      .leftJoin('task.user', 'user')
      .select('user.email', 'email')
      .addSelect('COUNT(task.id)', 'taskCount')
      .groupBy('user.email')
      .getRawMany();
  }
  async getCompletedStats() {
    return this.taskRepository
      .createQueryBuilder('task')
      .select('COUNT(*)', 'total')
      .addSelect(
        'SUM(CASE WHEN task.completed = true THEN 1 ELSE 0 END)',
        'completed',
      )
      .getRawOne();
  }
}
