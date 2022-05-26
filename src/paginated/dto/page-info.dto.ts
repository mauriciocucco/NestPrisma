import { ApiProperty } from '@nestjs/swagger';

export class PageInfoDto {
  @ApiProperty()
  hasNextPage: boolean;

  @ApiProperty()
  hasPreviousPage: boolean;

  @ApiProperty()
  startCursor: string;

  @ApiProperty()
  endCursor: string;
}
