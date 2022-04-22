import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NotesModule } from './modules/notes/notes.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [NotesModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
