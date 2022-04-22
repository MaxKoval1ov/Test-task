import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'modules/auth/auth.module';
import { DatabaseModule } from 'modules/database/database.module';

import { usersProviders } from './user.providers';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule, forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
  exports: [UsersService],
})
export class UsersModule {}
