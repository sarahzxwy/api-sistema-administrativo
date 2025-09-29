import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards, ValidationPipe} from '@nestjs/common';
import { Prisma, User, User as UserModel } from '@prisma/client';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

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

    @UseGuards(AuthGuard)
    @Get('user')
    async getUsers(): Promise<UserModel[]> {
        return this.userService.findAll();
    }

    @UseGuards(AuthGuard)
    @Get('search')
    async findByEmail(@Query('email') email: string) {
      return this.userService.findByEmail(email);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string) {
      return this.userService.findOne(Number(id));
    }

    @UseGuards(AuthGuard)
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

    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<UserModel> {
        return this.userService.deleteUser({ id: Number(id) });
    }
}

