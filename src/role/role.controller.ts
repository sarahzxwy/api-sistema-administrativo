import { Controller, Post, Body, Get, Param, Patch, Delete, ValidationPipe, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from '@prisma/client';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body(new ValidationPipe()) createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleService.create(createRoleDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(Number(id));
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateRoleDto: UpdateRoleDto,
  ) {
    return this.roleService.update(Number(id), updateRoleDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(Number(id));
  }

}

