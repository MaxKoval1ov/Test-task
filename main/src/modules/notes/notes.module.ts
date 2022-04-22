import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NotesController } from './notes.controller';

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
          queue: 'notes_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [NotesController],
})
export class NotesModule {}
