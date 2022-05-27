import { ApiProperty } from '@nestjs/swagger';

export class EdgeDto<Record> {
  node: Record;

  @ApiProperty()
  cursor: string;
}
