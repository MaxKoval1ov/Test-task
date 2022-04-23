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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { lastValueFrom } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UserActions } from './users.actions';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(@Inject('USERS_SERVICE') private readonly client: ClientProxy) {}

  @ApiOperation({ summary: 'Создать пользователя' })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.client.send(UserActions.CREATE_USER, userDto).toPromise();
  }

  @ApiOperation({ summary: 'Удалить пользователя' })
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.client.send(UserActions.DELETE_USER, id).toPromise();
  }

  @ApiOperation({ summary: 'Получить всех пользователей' })
  @Get()
  getAll() {
    return lastValueFrom(this.client.send(UserActions.GET_ALL_USERS, ''));
  }

  @ApiOperation({ summary: 'Обновить пользователя' })
  @Put()
  update(@Body() newUser: CreateUserDto) {
    return this.client.send(UserActions.UPDATE_USER, newUser).toPromise();
  }
}
