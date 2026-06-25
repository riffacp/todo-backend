import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllTasks(@Req() req: any) {
    return this.tasksService.findAll(req.user.userId);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getTask(@Param('id') id: string) {
    return this.tasksService.findOne(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createTask(@Body() body: { title: string }, @Req() req: any) {
    return this.tasksService.create(body.title, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.delete(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateTask(@Param('id') id: string, @Body() body: any) {
    return this.tasksService.update(Number(id), body.completed);
  }
}
