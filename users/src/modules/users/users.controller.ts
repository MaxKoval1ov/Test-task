import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { UserActions } from './users.actions';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: User })
  @EventPattern(UserActions.CREATE_USER)
  @Post()
  async create(@Payload() userDto: CreateUserDto) {
    const createdUser = await this.usersService.createUser(userDto);
    console.log(createdUser);
    return createdUser;
  }

  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  @EventPattern(UserActions.GET_ALL_USERS)
  async getAll() {
    return await this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Delete(':id')
  @EventPattern(UserActions.DELETE_USER)
  async delete(@Payload() @Param('id') id: number) {
    const deletedAmounth = await this.usersService.deleteUserById(id);
    // const channel = context.getChannelRef();
    // const originalMsg = context.getMessage();
    // channel.ack(originalMsg);

    return deletedAmounth;
  }

  @ApiOperation({ summary: 'Изменить пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Put()
  update(@Body() newUser: User) {
    return this.usersService.updateUser(newUser);
  }
}
