import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TaskService {
  @Inject()
    private readonly prisma: PrismaService;
    
  async create(createTaskDto: CreateTaskDto) {
    const { userIds, ...taskData } = createTaskDto;

    const task = await this.prisma.task.create({
      data: {
        ...taskData,
        users: {
          create: userIds.map((userId) => ({ userId })),
        },
      },
      include: {
        users: { include: { user: true } }, 
        project: true,
      },
    });

    return task;
  }

  async findAll() {
    return await this.prisma.task.findMany({
      include: {
        users: { 
          include: { 
            user: { include: { role: true } } 
          } 
        }, 
        project: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.task.findUnique({
      where: { id },
      include: {
        users: { 
          include: { 
            user: { include: { role: true } } 
          } 
        }, 
        project: true,
      },
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const { userIds, startAt, dueAt, completedAt, ...taskData } = updateTaskDto;
    const formattedTaskData = {
      ...taskData,
      startAt: startAt ? new Date(startAt) : undefined,
      dueAt: dueAt ? new Date(dueAt) : undefined,
      completedAt: completedAt ? new Date(completedAt) : null,
    };

    const task = await this.prisma.task.update({
      where: { id },
      data: {
        ...formattedTaskData,
        users: userIds
          ? {
              deleteMany: {}, 
              create: userIds.map((userId) => ({ userId })),
            }
          : undefined,
      },
      include: {
        users: { include: { user: true } },
        project: true,
      },
    });

    return task;
  }

  async remove(id: number) {
    await this.prisma.userTask.deleteMany({ where: { taskId: id } });
    return this.prisma.task.delete({ where: { id } });
  }
}