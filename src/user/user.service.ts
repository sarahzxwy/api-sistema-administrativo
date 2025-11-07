import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { User, Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async findAll() {
    return await this.prisma.user.findMany({
      include: {
        role: true,
        tasks: { include: { task: true } },
      },
    });
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
      include: {
        role: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
      include: {
        role: true,
      },
    });
  }

  async createUser(createUserDto: CreateUserDto, roleId: number) {
    const hashPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = { ...createUserDto,
      role: {
        connect: { id: roleId },
      },
    };
    return await this.prisma.user.create({
      data: { ...newUser, 
        password: hashPassword
      }, 
      
      include: {
        role: true,
      }
    });
  }

  async updateUser(
    id: number,
    data: Prisma.UserUpdateInput,
  ): Promise<User> {
    if (data.password) {
      data.password = await bcrypt.hash(data.password as string, 10);
    }
    return this.prisma.user.update({
      where: { id },
      data,
      include: {
        role: true,
      },
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}