import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

import { Task } from './tasks/task.entity';
import { User } from './users/user.entity';
import { ToolsController } from './tools/tools.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://tasks_db_kf7n_user:Giar6iseHRGJnRdhV46mZxVu8TBfdEqL@dpg-d8l9q5egvqtc73anckbg-a.singapore-postgres.render.com/tasks_db_kf7n',
      entities: [Task, User],
      synchronize: true,
      ssl: true,
    }),

    TasksModule,
    AuthModule,
  ],

  controllers: [ToolsController],
})
export class AppModule {}
