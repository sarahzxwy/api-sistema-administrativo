import { Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma, Role } from '@prisma/client';

@Injectable()
export class RoleService {
  @Inject()
  private readonly prisma: PrismaService;

 async role(
    roleWhereUniqueInput: Prisma.RoleWhereUniqueInput,
  ): Promise<Role | null> {
    return this.prisma.role.findUnique({
      where: roleWhereUniqueInput,
    });
  }

  async create(createRoleDto: CreateRoleDto) {console.log(createRoleDto);
    return await this.prisma.role.create({
      data: { ...createRoleDto },
    });
  }
  
  async findAll() {
      return await this.prisma.role.findMany({
        include: {
          users: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });
    }


  async findOne(id: number) {
    return await this.prisma.role.findUnique({
      where: { id },
      include: {
        users: true,
      },
    });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    return await this.prisma.role.update({
      where: { id },
      data: updateRoleDto,
    });
  }

  async remove(id: number) {
    return this.prisma.role.delete({ where: { id } });
  }
}
