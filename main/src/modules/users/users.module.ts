import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersController } from './users.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTE_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://rogzpnrc:zyDlzs7tnwwoQD_0MIYjV0jNLWv4GMkI@hawk.rmq.cloudamqp.com/rogzpnrc',
          ],
          queue: 'users_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [UsersController],
})
export class UsersModule {}
