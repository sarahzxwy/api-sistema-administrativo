import { Inject, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma, Project } from '@prisma/client';

@Injectable()
export class ProjectService {
  @Inject()
  private readonly prisma: PrismaService;

  async project(
    projectWhereUniqueInput: Prisma.ProjectWhereUniqueInput,
  ): Promise<Project | null> {
    return this.prisma.project.findUnique({
      where: projectWhereUniqueInput,
    });
  }

  async create(createProjectDto: CreateProjectDto) {
    const data = {
      ...createProjectDto,
      startAt: createProjectDto.startAt
        ? new Date(createProjectDto.startAt)
        : undefined,
      dueAt: createProjectDto.dueAt
        ? new Date(createProjectDto.dueAt)
        : undefined,
      completedAt: createProjectDto.completedAt
        ? new Date(createProjectDto.completedAt)
        : null,
    };

    return await this.prisma.project.create({ data });
  }

  async findAll() {
    return await this.prisma.project.findMany({
      include: {
        tasks: {
          include: {
            users: { include: { user: true } },
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.project.findUnique({
      where: { id },
      include: {
        tasks: {
          include: {
            users: { include: { user: true } },
          },
        },
      },
    });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const data = {
      ...updateProjectDto,
      startAt: updateProjectDto.startAt
        ? new Date(updateProjectDto.startAt)
        : undefined,
      dueAt: updateProjectDto.dueAt
        ? new Date(updateProjectDto.dueAt)
        : undefined,
      completedAt: updateProjectDto.completedAt
        ? new Date(updateProjectDto.completedAt)
        : null,
    };

    return await this.prisma.project.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return await this.prisma.project.delete({
      where: { id },
    });
  }
}
