import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UserActions } from './users.actions';

@Controller('users')
export class UsersController {
  constructor(@Inject('NOTE_SERVICE') private readonly client: ClientProxy) {}

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.client.send(UserActions.CREATE_USER, userDto).toPromise();
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    console.log(id);
    return this.client.send(UserActions.DELETE_USER, id).toPromise();
  }

  @Get()
  getAll() {
    return this.client.send(UserActions.GET_ALL_USERS, '');
  }

  @Put()
  update(@Body() newUser: CreateUserDto) {
    return this.client.emit(UserActions.UPDATE_USER, newUser);
  }
}
