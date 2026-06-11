import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: '123rifa',
      database: 'tasks_db',
      entities: [Task],
      synchronize: true, // only for development
    }),
    TasksModule,
  ],
})
export class AppModule {}
