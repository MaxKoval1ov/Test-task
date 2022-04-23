import { Controller, Param } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'modules/database/models/users.model';

import { CreateUserDto } from './dto/create-user.dto';
import { UserActions } from './users.actions';
import { UsersService } from './users.service';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @EventPattern(UserActions.CREATE_USER)
  async create(@Payload() userDto: CreateUserDto) {
    const createdUser = await this.usersService.createUser(userDto);
    return createdUser;
  }

  @EventPattern(UserActions.GET_ALL_USERS)
  async getAll() {
    return await this.usersService.getAllUsers();
  }

  @EventPattern(UserActions.DELETE_USER)
  async delete(@Payload() @Param('id') id: number) {
    const deletedAmounth = await this.usersService.deleteUserById(id);
    return deletedAmounth;
  }

  @EventPattern(UserActions.UPDATE_USER)
  async update(@Payload() newUser: User) {
    return await this.usersService.updateUser(newUser);
  }
}
