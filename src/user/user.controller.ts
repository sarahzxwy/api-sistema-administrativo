import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, ValidationPipe} from '@nestjs/common';
import { Prisma, User, User as UserModel } from '@prisma/client';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Post(':roleId')
    async signupUser(
        @Body(new ValidationPipe()) userData: CreateUserDto,
        @Request() req: any,
        @Param('roleId') roleId: string
    ): Promise<UserModel> {
      return this.userService.createUser(
      userData, Number(roleId)
    );
    }

    @Get('user')
    async getUsers(): Promise<UserModel[]> {
        return this.userService.findAll();
    }

    @Get('search')
    async findByEmail(@Query('email') email: string) {
      return this.userService.findByEmail(email);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
      return this.userService.findOne(Number(id));
    }

    @Patch(':id')
    async updateUser(
      @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
      @Param('id') id: string,
    ) {

      const { roleId, ...userData } = updateUserDto;
      return this.userService.updateUser( Number(id), {
        ...userData,
        ...(roleId && { role: { connect: { id: roleId } } }),
      });
    }

  
    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<UserModel> {
        return this.userService.deleteUser({ id: Number(id) });
    }
}

