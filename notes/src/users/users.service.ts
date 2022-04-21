import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepo: typeof User) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepo.create(dto);
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepo.findAll();
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepo.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async deleteUserById(id: number) {
    return await this.userRepo.destroy({ where: { id } });
  }

  async updateUser(newUser: User) {
    const foundUser = await this.userRepo.findOne({
      where: { id: newUser.id },
    });
    if (!foundUser) {
      const user = await this.userRepo.create(newUser);
      return { user, created: true };
    }
    const user = await this.userRepo.update(newUser, {
      where: { id: newUser.id },
    });
    return { user, created: false };
  }
}
