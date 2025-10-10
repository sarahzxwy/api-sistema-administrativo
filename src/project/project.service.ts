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
    return await this.prisma.project.create({
      data: { ...createProjectDto },
    });
  }

  async findAll() {
    return await this.prisma.project.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.project.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const data = {
      ...updateProjectDto,
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
