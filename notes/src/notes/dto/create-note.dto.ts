import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @ApiProperty({ description: 'Заголовок' })
  readonly title: string;
  @ApiProperty({ description: 'Контент заметки' })
  readonly content: string;
  @ApiProperty({ description: 'Id пользователя' })
  readonly userId: number;
}
